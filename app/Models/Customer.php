<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
		'customer_name',
        'name_of_person_in_charge',
        'closing_name',
        'postal_code',
        'address',
        'telephone',
        'mobilephone',
        'sales',
        'construction_start_date',
        'construction_completion_date',
        'remarks'
	];
}












