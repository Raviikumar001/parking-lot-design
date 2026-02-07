import { InMemorySpotRepo, InMemorySessionRepo } from "./infra/inMemoryRepos";
import { ParkingService } from "./services/parkingService";

async function demo() {
  const spotRepo = new InMemorySpotRepo([
    { id: 's1', size: 'CAR', code: 'F1-A1', status: 'AVAILABLE', distanceRank: 1 },
    { id: 's2', size: 'CAR', code: 'F1-A2', status: 'AVAILABLE', distanceRank: 2 }
  ] as any);
  const sessionRepo = new InMemorySessionRepo();
  const svc = new ParkingService(spotRepo, sessionRepo);

  const inRes = await svc.checkIn({ plate: 'ABC123', type: 'CAR' });
  console.log('Checked in:', inRes);

  // simulate wait
  await new Promise(r => setTimeout(r, 100));

  const session = (sessionRepo as any).sessions[0];
  const outRes = await svc.checkOut(session.id);
  console.log('Checked out, amount:', outRes.amount);
}

demo().catch(err => console.error(err));