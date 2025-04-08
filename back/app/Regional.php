<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    protected $fillable = ['nome'];

    public function clinicas()
    {
        return $this->hasMany(Clinica::class);
    }
}
