import { concat, Observable, OperatorFunction, Subscription } from 'rxjs';
import { publish } from 'rxjs/operators';

export function delayUntil<T>(
	notifier: Observable<any>
): OperatorFunction<T, T> {
	return source =>
		source.pipe(
			publish(published => {
				const delayed = new Observable<T>(subscriber => {
					let buffering = true;
					const buffer: T[] = [];
					const subscription = new Subscription();
					subscription.add(
						notifier.subscribe(
							() => {
								buffer.forEach(value => subscriber.next(value));
								subscriber.complete();
							},
							error => subscriber.error(error),
							() => {
								buffering = false;
								buffer.length = 0;
							}
						)
					);
					subscription.add(
						published.subscribe(
							value => buffering && buffer.push(value),
							error => subscriber.error(error)
						)
					);
					subscription.add(() => {
						buffer.length = 0;
					});
					return subscription;
				});
				return concat(delayed, published);
			})
		);
}
