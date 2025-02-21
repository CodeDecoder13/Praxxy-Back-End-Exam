<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'min:3',
                'max:255'
            ],
            'description' => [
                'required',
                'string',
                'min:10'
            ],
            'category' => [
                'required',
                'string',
                'max:255',
                'in:Electronics,Clothing,Food,Books,Other'
            ],
            'date_and_time' => [
                'required',
                'date',
                'after:now'
            ],
            'images' => [
                'required',
                'array',
                'min:1',
                'max:5'
            ],
            'images.*' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg,gif',
                'max:10240' // 10MB
            ]
        ], [
            'name.required' => 'Product name is required',
            'name.min' => 'Product name must be at least 3 characters',
            'name.max' => 'Product name must be less than 255 characters',
            'description.required' => 'Product description is required',
            'description.min' => 'Product description must be at least 10 characters',
            'category.required' => 'Product category is required',
            'category.in' => 'Please select a valid category',
            'date_and_time.required' => 'Date and time is required',
            'date_and_time.after' => 'Date and time must be in the future',
            'images.required' => 'At least one image is required',
            'images.max' => 'Maximum 5 images allowed',
            'images.*.image' => 'File must be an image',
            'images.*.mimes' => 'Image must be a jpeg, png, jpg or gif',
            'images.*.max' => 'Image size must not exceed 10MB'
        ]);

        try {
            DB::beginTransaction();

            // Handle image uploads
            $imageUrls = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    // Generate unique filename
                    $filename = uniqid() . '_' . $image->getClientOriginalName();
                    $path = $image->storeAs('products', $filename, 'public');
                    $imageUrls[] = Storage::url($path);
                }
            }

            // Create product with images
            $product = Product::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'category' => $validated['category'],
                'date_and_time' => Carbon::parse($validated['date_and_time']),
                'images' => $imageUrls
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Product created successfully',
                'product' => $product
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Delete uploaded images if any
            foreach ($imageUrls as $imageUrl) {
                Storage::delete(str_replace('/storage/', 'public/', $imageUrl));
            }

            return response()->json([
                'message' => 'Error creating product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index(Request $request)
    {
        $query = Product::query();

        // Case-insensitive search by Name/Description
        if ($search = $request->query('search')) {
            $search = strtolower($search);
            $query->where(function($q) use ($search) {
                $q->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        // Filter by Category (case-insensitive)
        if ($category = $request->query('category')) {
            $category = strtolower($category);
            $query->whereRaw('LOWER(category) = ?', [$category]);
        }

        // Paginate Results
        return response()->json($query->paginate(10));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'min:3',
                'max:255'
            ],
            'description' => [
                'required',
                'string',
                'min:10'
            ],
            'category' => [
                'required',
                'string',
                'max:255',
                'in:Electronics,Clothing,Food,Books,Other'
            ],
            'date_and_time' => [
                'required',
                'date',
                'after:now'
            ],
            'existing_images' => 'array',
            'images_to_delete' => 'array',
            'new_images' => 'array',
            'new_images.*' => [
                'image',
                'mimes:jpeg,png,jpg,gif',
                'max:10240' // 10MB
            ]
        ]);

        try {
            DB::beginTransaction();

            // Handle image deletions
            $currentImages = $product->images ?? [];
            $existingImages = $request->input('existing_images', []);
            $imagesToDelete = $request->input('images_to_delete', []);

            // Remove deleted images from storage
            foreach ($imagesToDelete as $imageUrl) {
                $path = str_replace('/storage/', '', $imageUrl);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            // Handle new image uploads
            $newImageUrls = [];
            if ($request->hasFile('new_images')) {
                foreach ($request->file('new_images') as $image) {
                    $filename = uniqid() . '_' . $image->getClientOriginalName();
                    $path = $image->storeAs('products', $filename, 'public');
                    $newImageUrls[] = Storage::url($path);
                }
            }

            // Combine existing and new images
            $finalImages = array_merge($existingImages, $newImageUrls);

            // Ensure we don't exceed 5 images
            if (count($finalImages) > 5) {
                throw new \Exception('Maximum 5 images allowed');
            }

            // Update product
            $product->update([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'category' => $validated['category'],
                'date_and_time' => Carbon::parse($validated['date_and_time']),
                'images' => $finalImages
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Product updated successfully',
                'product' => $product
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Delete any newly uploaded images if there was an error
            if (isset($newImageUrls)) {
                foreach ($newImageUrls as $imageUrl) {
                    $path = str_replace('/storage/', '', $imageUrl);
                    if (Storage::disk('public')->exists($path)) {
                        Storage::disk('public')->delete($path);
                    }
                }
            }

            return response()->json([
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
