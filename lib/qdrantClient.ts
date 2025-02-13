import { QdrantClient } from '@qdrant/js-client-rest';

// Initialize the Qdrant client
const client = new QdrantClient({
  host: 'localhost',  // Host of your Qdrant instance
  port: 6333,         // Port of your Qdrant instance
});

// Function to create a collection
export async function createCollection(collectionName: string, vectorSize: number) {
  try {
    const result = await client.createCollection(collectionName, {
      vectors: {
        size: vectorSize,
        distance: 'Cosine', // Or 'Euclidean', depending on your use case
      },
    });
    return result;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
}
export async function insertPoints(collectionName: string, points: Array<{ id: string; vector: Array<number> }>) {
    try {
      const result = await client.upsert(collectionName, {
        points: points,
      });
      return result;
    } catch (error) {
      console.error('Error inserting points:', error);
      throw error;
    }
  }
  

// Function to search for points in a collection with optional filtering
export async function searchPoints(collectionName: string, queryVector: Array<number>, filter?: any, limit: number = 5) {
    try {
      const result = await client.query(collectionName, {
        query: queryVector,  // The vector to search for
        filter: filter,      // Optional filter criteria
        params: {
          hnsw_ef: 128,     // Parameter for the HNSW algorithm
          exact: false,     // Whether to perform an exact search
        },
        limit: limit,       // Number of nearest neighbors to return
      });
      return result;
    } catch (error) {
      console.error('Error searching points:', error);
      throw error;
    }
  }
