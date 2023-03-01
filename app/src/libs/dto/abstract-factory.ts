import DTOFactory from './factory'

export default abstract class DTOAbstractFactory<E, T> implements DTOFactory<E, T> {
    toCollectionDTO(entityCollection: E[]): T[] {
        var collectionDTO: T[] = []
        entityCollection.forEach(entity => {
            collectionDTO.push(this.toDTO(entity))
        });

        return collectionDTO
    }

    abstract toDTO(entity: E): T
}