import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HTTP GET', () => {
    const url = 'url';
    const body = { data: { id: 'test' } };

    const serviceSpy = subscribeSpyTo(service.sendQuery(url));

    const req = http.expectOne(url);
    req.flush(body);
    expect(req.request.method).toEqual('GET');
    expect(serviceSpy.getValues()).toEqual([body]);
  });

  it('should call HTTP POST', () => {
    const url = 'url';
    const body = { data: { id: 'test' } };

    const serviceSpy = subscribeSpyTo(service.sendCommand<typeof body>(url, { data: 'some payload' }));

    const req = http.expectOne(url);
    req.flush(body);
    expect(req.request.method).toEqual('POST');
    expect(serviceSpy.getValues()).toEqual([body]);
  });
});
