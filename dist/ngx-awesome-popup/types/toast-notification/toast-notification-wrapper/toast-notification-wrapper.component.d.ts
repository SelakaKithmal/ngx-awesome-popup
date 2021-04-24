import {AfterViewInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ToastNotificationClass} from '../core/model';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {GlobalInterface} from '../../../core/global';
import {GlobalConfigService} from '../../../core/global-config.service';

export declare class ToastNotificationWrapperComponent implements AfterViewInit, OnDestroy {
    gConfig: GlobalConfigService;
    toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging;
    private cd;
    fadeInOutAnimation: string;
    timerStarted$: BehaviorSubject<string>;
    subTimer: Subscription;
    isTimerStarted: boolean;
    subsToClosingDelay: Subscription;
    timer: any;
    
    constructor(gConfig: GlobalConfigService, toastNotificationBelonging: ToastNotificationClass.ToastNotificationBelonging, cd: ChangeDetectorRef);
    
    ngAfterViewInit(): void;
    
    setResponse(_IsSuccess: boolean, _ClickedButtonID?: string): void;
    
    onOverlayClicked(evt: MouseEvent): void;
    
    onToastClicked(evt: MouseEvent): void;
    
    onCustomButton(_Button: GlobalInterface.IButton): void;
    
    onButtonClick(_Type: 'confirm' | 'decline'): void;
    
    autoClose(): void;
    
    autoCloseCondition(): boolean;
    
    closeParent$(_ClosingAnimation: string): Observable<any>;
    
    close(): void;
    
    mouseOver(): void;
    
    mouseOut(): void;
    
    ngOnDestroy(): void;
}
