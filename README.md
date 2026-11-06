# @lp-labs/fabric-yardage

Rectangular fabric row-cut planning with seam and end allowances.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/fabric-yardage
```

## Working example

```js
import { planFabric } from '@lp-labs/fabric-yardage';
if (planFabric(140, 60, 100, 5).totalLength !== 300) throw new Error('Fabric');
```

CommonJS: `const api = require('@lp-labs/fabric-yardage')`.

## Behavior, customization and limits

planFabric(fabricWidth,pieceWidth,pieceLength,pieces,seam=0,endAllowance=0) uses matching length units. Each cut dimension gains2*seam. Returns across,rows,cutWidth,cutLength,totalLength=rows*cutLength+2*endAllowance. Dimensions[1e-6,1e6],allowances[0,1e6],pieces integer1..1e6; cut must fit width without rotation,otherwise throws. O(1). Not arbitrary nesting,stripe matching,shrinkage or seam construction.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface FabricPlan {
  across: number;
  rows: number;
  cutWidth: number;
  cutLength: number;
  totalLength: number;
}
export declare function planFabric(
  fabricWidth: number,
  pieceWidth: number,
  pieceLength: number,
  pieces: number,
  seam?: number,
  endAllowance?: number,
): FabricPlan;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
