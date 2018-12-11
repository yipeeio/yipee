import { TestBed, inject, tick, async, fakeAsync } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


import { YipeeFileResponse } from '../../models/YipeeFileResponse';
import { OpenShiftFile } from '../../models/OpenShiftFile';
import { KubernetesFile } from '../../models/KubernetesFile';
import { DownloadService } from './download.service';
import { ApiService } from './api.service';
import { HelmFile } from '../../models/HelmFile';

describe('DownloadService', () => {

  const kubernetesFile1: KubernetesFile = {
    kubernetesFile: 'kubernetesFile1',
    name: 'kubernetesFile1',
    version: 2
  };

  const helmFile: HelmFile = {
    helmFile: 'helmFile1',
    name: 'helmFile1',
    version: 2
};

  class MockApiService {
    constructor() { }

    getKubernetesFileData(file): Observable<KubernetesFile> {
      return of(kubernetesFile1).pipe(delay(50));
    }

    getKubernetesArchiveFileData(file): Observable<KubernetesFile> {
      return of(kubernetesFile1).pipe(delay(50));
    }

    getHelmFileArchiveData(file): Observable<HelmFile> {
      return of(helmFile).pipe(delay(50));
    }

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        DownloadService,
        { provide: ApiService, useClass: MockApiService }
      ]
    });
  });

  it('should download a kubernetes archive file if you do not subscribe', fakeAsync(inject([DownloadService], (service: DownloadService) => {
    service.saveFile = () => { };
    service.convertB64 = () => {
      return [];
    };
    try {
      service.download({ ['app-info']: [{ name: 'foo' }] }, 'getKubernetesArchiveFileData', 'kubernetesarchive', true, 'kubernetesFile');
    } catch (error) {
      fail(error);
    }
    tick(1000);
  })));

  it('should download a kubernetes file if you do not subscribe', fakeAsync(inject([DownloadService], (service: DownloadService) => {
    service.saveFile = () => { };
    service.convertB64 = () => {
      return [];
    };
    try {
      service.download({ ['app-info']: [{ name: 'foo' }] }, 'getKubernetesFileData', 'kubernetes', false, 'kubernetesFile');
    } catch (error) {
      fail(error);
    }
    tick(1000);
  })));

  it('should download a helm file if you do not subscribe', fakeAsync(inject([DownloadService], (service: DownloadService) => {
    service.saveFile = () => { };
    service.convertB64 = () => {
      return [];
    };
    try {
      service.download({ ['app-info']: [{ name: 'foo' }] }, 'getHelmFileArchiveData', 'helmbundle', true, 'helmFile');
    } catch (error) {
      fail(error);
    }
    tick(1000);
  })));

  it('should download a kubernetes archive file if you subscribe', fakeAsync(inject([DownloadService], (service: DownloadService) => {
    service.saveFile = () => { };
    service.convertB64 = () => {
      return [];
    };
    let result: boolean;
    service.download({ ['app-info']: [{ name: 'foo' }] }, 'getKubernetesArchiveFileData', 'kubernetesarchive', true, 'kubernetesFile').subscribe(
      (data) => {
        result = data;
      },
      (error) => {
        result = error;
      }
    );
    tick(1000);
    expect(result).toBeTruthy();
  })));

  it('should download a kubernetes file if you subscribe', fakeAsync(inject([DownloadService], (service: DownloadService) => {
    service.saveFile = () => { };
    service.convertB64 = () => {
      return [];
    };
    let result: boolean;
    service.download({ ['app-info']: [{ name: 'foo' }] }, 'getKubernetesFileData', 'kubernetes', false, 'kubernetesFile').subscribe(
      (data) => {
        result = data;
      },
      (error) => {
        result = error;
      }
    );
    tick(1000);
    expect(result).toBeTruthy();
  })));

  it('should download a helm file if you subscribe', fakeAsync(inject([DownloadService], (service: DownloadService) => {
    service.saveFile = () => { };
    service.convertB64 = () => {
      return [];
    };
    let result: boolean;
    service.download({ ['app-info']: [{ name: 'foo' }] }, 'getHelmFileArchiveData', 'helmbundle', true, 'helmFile').subscribe(
      (data) => {
        result = data;
      },
      (error) => {
        result = error;
      }
    );
    tick(1000);
    expect(result).toBeTruthy();
  })));

  // /* disable the download tests as they break Chrome v64

  // it('should download a kubernetes file by id', inject([DownloadService], (service: DownloadService) => {
  //   service.downloadKubernetesFileById('5551212');
  // }));

  // it('should download a openshift archive file by id', inject([DownloadService], (service: DownloadService) => {
  //   service.downloadOpenShiftArchiveById('5551212');
  // }));

  // it('should download a openshift file by id', inject([DownloadService], (service: DownloadService) => {
  //   service.downloadOpenShiftFileById('5551212');
  // }));

  // */

});
