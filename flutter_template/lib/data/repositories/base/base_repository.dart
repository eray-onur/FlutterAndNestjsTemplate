abstract class BaseRepository<T> {
  Future<T> fetchAsync();
  Future<List<T>> fetchMultipleAsync();
  Future addAsync(T entity);
  Future removeAsync(T entity);
  Future updateAsync(T entity);
}