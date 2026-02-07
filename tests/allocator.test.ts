import { InMemorySpotRepo, InMemorySessionRepo } from "../src/infra/inMemoryRepos";
import { SimpleAllocator } from "../src/services/simpleAllocator";

test('allocates an available spot to a vehicle', async () => {
  const spotRepo = new InMemorySpotRepo([{ id: 's1', size: 'CAR', code: 'S1', status: 'AVAILABLE', distanceRank: 1 } as any]);
  const sessionRepo = new InMemorySessionRepo();
  const allocator = new SimpleAllocator(spotRepo, sessionRepo);

  const spot = await allocator.allocate({ plate: 'X', type: 'CAR' });
  expect(spot.id).toBe('s1');
  const updated = await spotRepo.findById('s1');
  expect(updated?.status).toBe('OCCUPIED');
});