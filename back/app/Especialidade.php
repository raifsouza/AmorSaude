<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Especialidade extends Model
{
    protected $fillable = ['nome'];

    public function clinicas()
    {
        return $this->belongsToMany(Clinica::class, 'clinica_especialidade');
    }
}
