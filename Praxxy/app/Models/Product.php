<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'description',
        'images',
        'date_and_time',
    ];

    protected $casts = [
        'date_and_time' => 'datetime',
        'images' => 'array',
    ];
}
