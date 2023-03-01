import { ExampleResponseDTO } from "./response";
import { Example } from '@prisma/client';
import DTOAbstractFactory from "../../libs/dto/abstract-factory";

export default class ExampleDTOFactory extends DTOAbstractFactory<Example, ExampleResponseDTO> {
    toDTO(example: Example): ExampleResponseDTO {
        return {
            id: example.id,
            name: example.name,
            email: example.email,
        }
    }    
}