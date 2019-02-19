import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService, Product, Member } from '../data.service';
import { HttpClient } from '@angular/common/http';

import Quagga from 'quagga';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  barcode = '';

  configQuagga = {
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      // target: document.querySelector('#inputBarcode'),
      constraints: {
        // width: { min: 640 },
        // height: { min: 480 },
        aspectRatio: { min: 1, max: 100 },
        facingMode: 'environment'
      },
      singleChannel: false
    },
    tracking: false,
    debug: false,
    controls: false,
    locate: true,
    numOfWorkers: navigator.hardwareConcurrency,
    visual: {
      show: true
    },
    locator: {
      patchSize: 'medium',
      halfSample: true,
      showCanvas: false,
      showPatches: false,
      showFoundPatches: false,
      showSkeleton: false,
      showLabels: false,
      showPatchLabels: false,
      showRemainingPatchLabels: false,
      boxFromPatches: {
        showTransformed: false,
        showTransformedBox: false,
        showBB: false
      }
    },
    decoder: {
      readers: ['code_128_reader', 'ean_reader', 'upc_reader'],
      drawBoundingBox: false,
      showFrequency: false,
      drawScanline: true,
      showPattern: false,
    }
  };

  constructor(private ref: ChangeDetectorRef, private router: Router, private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    console.log('Barcode scanner: initialization');

    this.startScanner();
  }

  testChangeValues() {
    this.barcode = '0123456789';
  }

  startScanner() {
    this.barcode = '';
    this.ref.detectChanges();

    Quagga.onProcessed((result) => this.onProcessed(result));
    Quagga.onDetected((result) => this.logCode(result));

    Quagga.init(this.configQuagga, (error) => {
      if (error) {
        return console.log(error);
      }

      Quagga.start();
      console.log('Barcode Scanner: Initialization finished. Ready to start...');
    });
  }

  private onProcessed(result: any) {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
        result.boxes.filter(function (box) {
          return box !== result.box;
        }).forEach(function (box) {
          Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 3 });
        });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
      }
    }
  }

  private logCode(result) {
    const code = result.codeResult.code;

    if (this.barcode !== code) {
      this.barcode = 'Code-barres EAN : ' + code;

      this.checkProduct(code);

      this.ref.detectChanges();
      console.log(this.barcode);
      Quagga.stop();
    }
  }

  checkProduct(barcode: String) {
    this.http.get(this.data.PRODUCT_API_URL + barcode).subscribe(json => {
      if (json === null) {
        // check member api
        this.checkMember(barcode);
      } else {
        console.log(json);
        this.router.navigate(['/product/' + barcode], json); // temporary
      }
    });
  }

  checkMember(barcode: String) {
    this.http.get(this.data.MEMBER_API_URL + barcode).subscribe(json => {
      if (json === null) {
        // navigate to not found page
        console.log('not found');
        this.router.navigate(['missing']);
      } else {
        this.router.navigateByUrl('/member/' + barcode); // temporary
      }
    });
  }
}
