<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clinica;
use Illuminate\Http\Request;

class ClinicaController extends Controller
{
    public function index(Request $request)
    {
        $query = Clinica::query();
    
        if ($request->has('search')) {
            $query->where('nome', 'like', '%' . $request->search . '%');
        }
    
        return $query->paginate(5);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'razao_social' => 'required|string',
            'nome_fantasia' => 'required|string',
            'cnpj' => 'required|string|unique:clinicas,cnpj',
            'regional_id' => 'required|exists:regionais,id',
            'data_inauguracao' => 'required|date',
            'ativa' => 'boolean',
            'especialidades' => 'array|required',
            'especialidades.*' => 'exists:especialidades,id',
        ]);

        $clinica = Clinica::create($data);
        $clinica->especialidades()->sync($data['especialidades']);

        return response()->json($clinica->load('regional', 'especialidades'), 201);
    }

    public function show($id)
    {
        return Clinica::with(['regional', 'especialidades'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $clinica = Clinica::findOrFail($id);

        $data = $request->validate([
            'razao_social' => 'required|string',
            'nome_fantasia' => 'required|string',
            'cnpj' => 'required|string|unique:clinicas,cnpj,' . $clinica->id,
            'regional_id' => 'required|exists:regionais,id',
            'data_inauguracao' => 'required|date',
            'ativa' => 'boolean',
            'especialidades' => 'array|required',
            'especialidades.*' => 'exists:especialidades,id',
        ]);

        $clinica->update($data);
        $clinica->especialidades()->sync($data['especialidades']);

        return response()->json($clinica->load('regional', 'especialidades'));
    }

    public function destroy($id)
    {
        $clinica = Clinica::findOrFail($id);
        $clinica->delete();

        return response()->json(['message' => 'Clínica removida com sucesso']);
    }
}
