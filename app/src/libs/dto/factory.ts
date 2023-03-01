export default interface DTOFactory<E, T> {
    toCollectionDTO(collection: E[]): T[]
    toDTO(entity: E): T
}