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
    public function index()
    {
        $videos = Video::latest()->get();
        Log::info('Fetched videos:', ['count' => $videos->count(), 'videos' => $videos->toArray()]);

        return Inertia::render('sidebar/video-management', [
            'videos' => $videos,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

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
                $video->url = Storage::disk('public')->url($videoPath);
                Log::info('Video stored at:', ['path' => $videoPath, 'url' => $video->url]);
            }

            if ($request->hasFile('thumbnail')) {
                $thumbnailFile = $request->file('thumbnail');
                $thumbnailPath = $thumbnailFile->store('thumbnails', 'public');
                $video->thumbnail = Storage::disk('public')->url($thumbnailPath);
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
            ]);

            $video->update($request->only(['title', 'description']));

            return redirect()->back()->with('success', 'Video updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update video. ' . $e->getMessage());
        }
    }

    public function destroy(Video $video)
    {
        try {
            if ($video->url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', parse_url($video->url, PHP_URL_PATH)));
            }
            
            if ($video->thumbnail) {
                Storage::disk('public')->delete(str_replace('/storage/', '', parse_url($video->thumbnail, PHP_URL_PATH)));
            }

            $video->delete();

            return redirect()->back()->with('success', 'Video deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete video. ' . $e->getMessage());
        }
    }
}
