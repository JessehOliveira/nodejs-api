import { ExampleCreateDTO } from './dto/create';
import ExampleDTOFactory from './dto/factory';
import { ExampleResponseCollectionDTO, ExampleResponseDTO } from './dto/response';
import { ExampleUpdateDTO } from './dto/update';
import ExamplesService from "./service"

export default class ExamplesController {
    service: ExamplesService
    dto: ExampleDTOFactory

    constructor() {
        this.service = new ExamplesService()
        this.dto = new ExampleDTOFactory()
    }

    async get(id: number): Promise<ExampleResponseDTO> {
        return this.dto.toDTO(
            await this.service.get(id)
        )
    }

    async getAll(limit: number, offset: number): Promise<ExampleResponseCollectionDTO> {
        return this.dto.toCollectionDTO(
            await this.service.getAll(limit, offset)
        )
    }

    async create(example: ExampleCreateDTO): Promise<ExampleResponseDTO> {
        return this.dto.toDTO(
            await this.service.create(example)
        )
    }

    async update(id: number, example: ExampleUpdateDTO): Promise<ExampleResponseDTO> {
        return this.dto.toDTO(
            await this.service.update(id, example)
        )
    }

    async delete(id: number): Promise<void> {
        await this.service.delete(id)
    }
}