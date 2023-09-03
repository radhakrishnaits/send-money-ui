import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SummaryPageComponent } from './summary-page.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { fakeAsync, tick } from '@angular/core/testing';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { of } from 'rxjs/internal/observable/of';


describe('SummaryPageComponent', () => {
  let component: SummaryPageComponent;
  let fixture: ComponentFixture<SummaryPageComponent>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let httpService: jasmine.SpyObj<HttpService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let dataService: DataService;

  beforeEach(async () => {
    dataService = jasmine.createSpyObj('DataService', ['getAccountNumber']);
    httpService = jasmine.createSpyObj('HttpService', ['getTransactionRates', 'saveTransaction']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule], 
      declarations: [ SummaryPageComponent ],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: HttpService, useValue: httpService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set component properties', fakeAsync(() => {
    dataService.amount = 100;
    dataService.currencyCode = 'USD';
    dataService.card = { cardNumber: '123456' };
    
    const mockData = {
      fxrate: 1.2,
      commission: 10,
      receiverAmount: 120,
    };
    component.ngOnInit();
    httpService.getTransactionRates('USD',100);
    tick(1000);
    expect(httpService.getTransactionRates).toHaveBeenCalledWith('USD', 100);
    expect(component.amount).toEqual(100);
    expect(component.currencyTarget).toEqual('USD');
    expect(component.cardDetails).toEqual({ cardNumber: '123456' });
  }));

  it('getTransactioRates should make HTTP requests and set properties', () => {
    const mockData = {
      fxrate: 1.2,
      commission: 10,
      receiverAmount: 120,
    };
    httpService.getTransactionRates.and.returnValues(of(mockData), of({ receiverAmount: 120 }));
    component.currencyTarget = 'USD';
    component.amount = 100;
    component.getTransactioRates();
    expect(httpService.getTransactionRates).toHaveBeenCalledWith('USD', 1);
    expect(httpService.getTransactionRates).toHaveBeenCalledWith('USD', 100);
    expect(component.targetCurrency).toEqual(1.2);
    expect(component.transactionFee).toEqual(10);
    expect(component.moneyTobeTransfer).toEqual(120);
  });

  it('transferMoney should make an HTTP request and navigate to "/sender"', fakeAsync(() => {
    httpService.saveTransaction.and.returnValue(of({}));
    dataService.accountNumber = 12345;
    component.cardDetails = {
      cardNumber: '123456',
      cardExpiry: '12/25',
      nameOnCard: 'John Doe',
    };
    component.sendMoneyToBeneficiary();
    expect(httpService.saveTransaction).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith('Transaction Completed Successfully', 'Close', {
      duration: 2000,
      panelClass: 'app-notification-success',
    });
    tick(1000);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sender']);
  }));


  it('should open snackBar and navigate to "/sender"', fakeAsync(() => {
    component.cancelTransaction();
    expect(mockSnackBar.open).toHaveBeenCalledWith('Transaction Cancelled', 'Close', { duration: 2000 });
    tick(1000);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sender']);
  }));
});
