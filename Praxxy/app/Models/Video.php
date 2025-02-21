<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'url',
        'thumbnail',
    ];

    protected $appends = [
        'formatted_created_at',
    ];

    public function getFormattedCreatedAtAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function getUrlAttribute($value)
    {
        if (!$value) return null;
        return $value[0] === '/' ? $value : '/storage/' . $value;
    }

    public function getThumbnailAttribute($value)
    {
        if (!$value) return null;
        return $value[0] === '/' ? $value : '/storage/' . $value;
    }
}
