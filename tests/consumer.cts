import { planFabric } from '@lp-labs/fabric-yardage';
if (planFabric(140, 60, 100, 5).totalLength !== 300) throw new Error('Fabric');
// @ts-expect-error invalid argument must be rejected by declarations
planFabric('140', 60, 100, 5);
