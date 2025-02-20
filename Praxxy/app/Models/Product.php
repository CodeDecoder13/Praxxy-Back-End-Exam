<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'category',
        'description',
        'date_and_time',
    ];

    protected $casts = [
        'date_and_time' => 'datetime',
    ];
}
