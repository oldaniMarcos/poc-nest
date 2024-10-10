import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity.js';

@Injectable()
export class ClienteService {

  private clientes: Cliente[] = [
    {id: 1, dni: '22333444', nombre: 'Juan', apellido: 'Perez'},
    {id: 2, dni: '33444555', nombre: 'Agustin', apellido: 'Rodriguez'},
    {id: 3, dni: '44555666', nombre: 'Bruno', apellido: 'Gomez'},
  ]

  create(createClienteDto: CreateClienteDto): Cliente {
    const cliente = new Cliente();

    cliente.id = Math.max(...this.clientes.map(cliente => cliente.id), 0) + 1;    
    cliente.dni = createClienteDto.dni;
    cliente.nombre = createClienteDto.nombre;
    cliente.apellido = createClienteDto.apellido;

    this.clientes.push(cliente);

    return cliente;
  }

  findAll(): Cliente[] {
    return this.clientes
  }

  findOne(id: number): Cliente {

    const cliente = this.clientes.find(clientes => clientes.id === id);

    if (!cliente) throw new NotFoundException(`Cliente con id ${id} no fue encontrado.`); 

    return cliente;
    
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    const { dni, nombre, apellido } = updateClienteDto;

    const cliente = this.findOne(id);

    if (dni) cliente.dni = dni;
    if (nombre) cliente.nombre = nombre;
    if (apellido) cliente.apellido = apellido;

    return cliente;
  }

  remove(id: number) {
    this.findOne(id);
    this.clientes = this.clientes.filter(cliente => cliente.id !== id);
  }
}
