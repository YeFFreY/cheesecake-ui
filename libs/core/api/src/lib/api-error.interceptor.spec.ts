import { TestBed } from '@angular/core/testing';

import { ApiErrorInterceptor } from './api-error.interceptor';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

function mockError(status: number) {
  return {
    handle: jest.fn(() => throwError(
      new HttpErrorResponse({ status, error: { message: 'This is an error' } })))
  };
}

function mockOk() {
  return {
    handle: jest.fn(() => of(new HttpResponse({ status: 200,  body: { id: 'ok' } })))
  };
}

describe('ApiErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor = TestBed.inject(ApiErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should intercept 0 http errors', () => {
    const interceptor = TestBed.inject(ApiErrorInterceptor);

    const serviceSpy = subscribeSpyTo(interceptor.intercept(new HttpRequest('GET', '/'), mockError(0)));
    expect(serviceSpy.getValues()).toEqual([]);
    expect(serviceSpy.receivedError()).toBeFalsy();
  });

  it('should not intercept 200 http', () => {
    const interceptor = TestBed.inject(ApiErrorInterceptor);

    const serviceSpy = subscribeSpyTo(interceptor.intercept(new HttpRequest('GET', '/'), mockOk()));
    const responses = serviceSpy.getValues();
    expect(responses[0].body.id).toEqual('ok')
  });

  it('should not intercept 400 http errors', async () => {
    const interceptor = TestBed.inject(ApiErrorInterceptor);

    const serviceSpy = subscribeSpyTo(interceptor.intercept(new HttpRequest('GET', '/'), mockError(400)), {expectErrors: true});
    expect(serviceSpy.receivedError()).toBeTruthy();
    const error = serviceSpy.getError();
    expect(error.type).toEqual('InvalidRequest');
  });

  it('should intercept 403 http errors', () => {
    const interceptor = TestBed.inject(ApiErrorInterceptor);

    const serviceSpy = subscribeSpyTo(interceptor.intercept(new HttpRequest('GET', '/'), mockError(403)));
    expect(serviceSpy.getValues()).toEqual([]);
    expect(serviceSpy.receivedError()).toBeFalsy();
  });

  it('should intercept 404 http errors', () => {
    const interceptor = TestBed.inject(ApiErrorInterceptor);

    const serviceSpy = subscribeSpyTo(interceptor.intercept(new HttpRequest('GET', '/'), mockError(404)));
    expect(serviceSpy.getValues()).toEqual([]);
    expect(serviceSpy.receivedError()).toBeFalsy();
  });


  it('should not intercept 422 http errors', async () => {
    const interceptor = TestBed.inject(ApiErrorInterceptor);

    const serviceSpy = subscribeSpyTo(interceptor.intercept(new HttpRequest('GET', '/'), mockError(422)), {expectErrors: true});
    expect(serviceSpy.receivedError()).toBeTruthy();
    const error = serviceSpy.getError();
    expect(error.type).toEqual('InvalidRequest');
  });

  it('should intercept 500 http errors', () => {
    const interceptor = TestBed.inject(ApiErrorInterceptor);

    const serviceSpy = subscribeSpyTo(interceptor.intercept(new HttpRequest('GET', '/'), mockError(500)));
    expect(serviceSpy.getValues()).toEqual([]);
  });

});
