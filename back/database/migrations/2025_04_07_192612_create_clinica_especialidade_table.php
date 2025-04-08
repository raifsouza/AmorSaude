<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClinicaEspecialidadeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clinica_especialidade', function (Blueprint $table) {
            $table->unsignedInteger('clinica_id');
            $table->unsignedInteger('especialidade_id');
    
            $table->foreign('clinica_id')->references('id')->on('clinicas')->onDelete('cascade');
            $table->foreign('especialidade_id')->references('id')->on('especialidades')->onDelete('cascade');
    
            $table->primary(['clinica_id', 'especialidade_id']);
        });
    }    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clinica_especialidade');
    }
}
