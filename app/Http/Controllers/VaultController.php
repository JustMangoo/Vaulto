<?php

namespace App\Http\Controllers;

use App\Models\Vault;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\NoReturn;

class VaultController extends Controller
{
    public function index()
    {
        $vaults = Vault::latest()->get();
        return inertia('vaults/Index', compact('vaults'));
    }

    public function create()
    {
        return inertia('vaults/Create');
    }

    public function edit(Vault $vault)
    {
        return inertia('vaults/Edit', compact('vault'));
    }

    // TODO: add update() and destroy() actions and register their routes

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'tag' => 'nullable|string|max:255',
        ]);

        Vault::create($data);

        return redirect()->route('vaults.index')->with('message', 'Vault added yippee');
    }
}
