<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sales extends Model
{
    protected $fillable = ['customer_id', 'list_item', 'total_amount'];
}
