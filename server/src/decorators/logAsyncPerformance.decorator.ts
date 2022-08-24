import {performance} from 'perf_hooks';
/* eslint-disable @typescript-eslint/no-explicit-any */
export function logAsyncPerformance(operation: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      if (!process.env['LOG_PERFORMANCE']) {
        const result = await originalMethod.apply(this, args)
        return result
      }

      const startTime = performance.now()
      const result = await originalMethod.apply(this, args)
      const endTime = performance.now()
      const time = endTime - startTime
      console.log(`DURATION ${time}ms of operation: ${operation}`);

      return result
    }

    return descriptor
  }
}
