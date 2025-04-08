<?php

namespace App\Http\Controllers;

use App\Clinica;
use App\Regional;
use App\Especialidade;
use Illuminate\Http\Request;

class ClinicaController extends Controller
{
    public function index()
    {
        $clinicas = Clinica::with('regional', 'especialidades')->get();
        return view('clinicas.index', compact('clinicas'));
    }

    public function create()
    {
        $regionais = Regional::all();
        $especialidades = Especialidade::all();
        return view('clinicas.create', compact('regionais', 'especialidades'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'razao_social' => 'required|string',
            'nome_fantasia' => 'required|string',
            'cnpj' => 'required|string',
            'regional_id' => 'required|exists:regionais,id',
            'data_inauguracao' => 'required|date',
            'ativa' => 'nullable|boolean',
            'especialidades' => 'array|exists:especialidades,id'
        ]);

        $clinica = Clinica::create($data);
        $clinica->especialidades()->sync($request->especialidades);

        return redirect()->route('clinicas.index')->with('success', 'Clínica criada com sucesso!');
    }

    public function edit($id)
    {
        $clinica = Clinica::with('especialidades')->findOrFail($id);
        $regionais = Regional::all();
        $especialidades = Especialidade::all();
        return view('clinicas.edit', compact('clinica', 'regionais', 'especialidades'));
    }

    public function update(Request $request, $id)
    {
        $clinica = Clinica::findOrFail($id);

        $data = $request->validate([
            'razao_social' => 'required|string',
            'nome_fantasia' => 'required|string',
            'cnpj' => 'required|string',
            'regional_id' => 'required|exists:regionais,id',
            'data_inauguracao' => 'required|date',
            'ativa' => 'nullable|boolean',
            'especialidades' => 'array|exists:especialidades,id'
        ]);

        $clinica->update($data);
        $clinica->especialidades()->sync($request->especialidades);

        return redirect()->route('clinicas.index')->with('success', 'Clínica atualizada com sucesso!');
    }

    public function destroy($id)
    {
        $clinica = Clinica::findOrFail($id);
        $clinica->especialidades()->detach();
        $clinica->delete();

        return redirect()->route('clinicas.index')->with('success', 'Clínica deletada com sucesso!');
    }
}
