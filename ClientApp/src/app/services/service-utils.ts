import {Observable, of} from 'rxjs';
import {DateTime} from 'luxon';


export function handleError<T>(serviceName: string, operation: string = 'operation', failGracefully = true, result?: T) {
  return (error: any): Observable<T> | never => {
    log(serviceName, `${operation} Error Handler: ${JSON.stringify(error)}`, 'error');

    if (failGracefully) {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }

    throw new Error(`${serviceName} ${operation} Error Handler: ${JSON.stringify(error)}`);

  };
}

export function log(serviceName: string, message: string, level = 'none') {
  const currDt = DateTime.local().toLocaleString(DateTime.DATETIME_FULL);
  if (level === 'debug') {
    console.log(`${currDt} ${serviceName}: ${message}`);

  } else if (level === 'error') {
    console.error(`${currDt} ${serviceName}: ${message}`);
  }
}


