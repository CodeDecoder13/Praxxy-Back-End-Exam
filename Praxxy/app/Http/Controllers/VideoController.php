<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class VideoController extends Controller
{
    

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'video' => 'required|file|mimetypes:video/mp4,video/avi,video/mpeg,video/quicktime|max:102400',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $video = new Video();
            $video->title = $request->title;
            $video->description = $request->description;

            if ($request->hasFile('video')) {
                $videoFile = $request->file('video');
                $videoPath = $videoFile->store('videos', 'public');
                $video->url = '/storage/' . $videoPath;
                Log::info('Video stored at:', ['path' => $videoPath, 'url' => $video->url]);
            }

            if ($request->hasFile('thumbnail')) {
                $thumbnailFile = $request->file('thumbnail');
                $thumbnailPath = $thumbnailFile->store('thumbnails', 'public');
                $video->thumbnail = '/storage/' . $thumbnailPath;
                Log::info('Thumbnail stored at:', ['path' => $thumbnailPath, 'url' => $video->thumbnail]);
            }

            $video->save();
            Log::info('Video saved:', ['video' => $video->toArray()]);

            return redirect()->route('sidebar.video-management')->with('success', 'Video uploaded successfully!');
        } catch (\Exception $e) {
            Log::error('Failed to upload video:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to upload video. ' . $e->getMessage());
        }
    }

    public function update(Request $request, Video $video)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'video' => 'nullable|file|mimetypes:video/mp4,video/avi,video/mpeg,video/quicktime|max:102400',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $video->title = $request->title;
            $video->description = $request->description;

            if ($request->hasFile('video')) {
                // Delete old video file
                if ($video->url) {
                    $oldPath = str_replace('/storage/', '', $video->url);
                    Storage::disk('public')->delete($oldPath);
                }

                $videoFile = $request->file('video');
                $videoPath = $videoFile->store('videos', 'public');
                $video->url = '/storage/' . $videoPath;
            }

            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail
                if ($video->thumbnail) {
                    $oldPath = str_replace('/storage/', '', $video->thumbnail);
                    Storage::disk('public')->delete($oldPath);
                }

                $thumbnailFile = $request->file('thumbnail');
                $thumbnailPath = $thumbnailFile->store('thumbnails', 'public');
                $video->thumbnail = '/storage/' . $thumbnailPath;
            }

            $video->save();
            return redirect()->back()->with('success', 'Video updated successfully!');
        } catch (\Exception $e) {
            Log::error('Failed to update video:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to update video. ' . $e->getMessage());
        }
    }

    public function destroy(Video $video)
    {
        try {
            // Delete video file
            if ($video->url) {
                $videoPath = str_replace('/storage/', '', $video->url);
                Storage::disk('public')->delete($videoPath);
            }

            // Delete thumbnail
            if ($video->thumbnail) {
                $thumbnailPath = str_replace('/storage/', '', $video->thumbnail);
                Storage::disk('public')->delete($thumbnailPath);
            }

            $video->delete();
            return redirect()->back()->with('success', 'Video deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Failed to delete video:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to delete video. ' . $e->getMessage());
        }
    }
}
