import { ApiService } from './api.service';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';

describe('ApiService', () => {
  let spectator: SpectatorHttp<ApiService>;
  const createService = createHttpFactory({
    service: ApiService,
    imports: [RouterTestingModule]
  })

  beforeEach(() => {
    spectator = createService();
  });


  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call HTTP GET', () => {
    const url = 'url';
    const body = { data: { id: 'test' } };

    const serviceSpy = subscribeSpyTo(spectator.service.sendQuery(url));

    const req = spectator.expectOne(url, HttpMethod.GET);
    req.flush(body);
    expect(serviceSpy.getValues()).toEqual([body]);
  });

  it('should call HTTP POST', () => {
    const url = 'url';
    const body = { data: { id: 'test' } };

    const serviceSpy = subscribeSpyTo(spectator.service.sendCommand<typeof body>(url, { data: 'some payload' }));

    const req = spectator.expectOne(url, HttpMethod.POST);
    req.flush(body);
    expect(serviceSpy.getValues()).toEqual([body]);
  });
});
