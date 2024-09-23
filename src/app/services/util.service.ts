import { animate, state, style, trigger } from "@angular/animations";
import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class UtilService {

    private renderer: Renderer2;

    constructor(private rendererFactory: RendererFactory2) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    showSuccessMessage(message: string) {
        let successAlert: HTMLBaseElement = this.renderer.createElement('div');
        this.renderer.addClass(successAlert, 'alert');
        this.renderer.addClass(successAlert, 'alert-success');
        this.renderer.addClass(successAlert, 'alert-dismissible');
        this.renderer.addClass(successAlert, 'fade');
        this.renderer.addClass(successAlert, 'show');
        
        this.renderer.setStyle(successAlert, 'position', 'fixed');
        this.renderer.setStyle(successAlert, 'z-index', '10000');
        this.renderer.setStyle(successAlert, 'top', '5rem');
        this.renderer.setStyle(successAlert, 'right', '3rem');
        this.renderer.setStyle(successAlert, 'width', '40rem');
        this.renderer.setStyle(successAlert, 'max-width', '40rem');
        this.renderer.setAttribute(successAlert, 'role', 'alert')
        
        let fullMessage = '<b>Well done! </b> ' + message;
        this.renderer.setProperty(successAlert, 'innerHTML', fullMessage);
        this.addCloseButton(successAlert);
        this.renderer.appendChild(document.body, successAlert);

        let that = this;
        setTimeout(function() {
            that.fadeAwayElement(successAlert);

        }, 4000);
        setTimeout(function() {
            successAlert.remove();
        }, 6000); 
    }

    showErrorMessage(error: any, defaultMessage: string) {
        let errorAlert: HTMLBaseElement = this.renderer.createElement('div');
        this.renderer.addClass(errorAlert, 'alert');
        this.renderer.addClass(errorAlert, 'alert-danger');
        this.renderer.addClass(errorAlert, 'alert-dismissible');
        this.renderer.setStyle(errorAlert, 'position', 'fixed');
        this.renderer.setStyle(errorAlert, 'z-index', '10000');
        this.renderer.setStyle(errorAlert, 'top', '5rem');
        this.renderer.setStyle(errorAlert, 'right', '3rem');
        this.renderer.setStyle(errorAlert, 'width', '40rem');
        this.renderer.setStyle(errorAlert, 'max-width', '40rem');
        this.renderer.setAttribute(errorAlert, 'role', 'alert')
        
        let fullError = '<b>Error! </b> ';
        if (error.displayMessage ) {
            fullError = fullError + error.displayMessage;
        } else {
            fullError = fullError + defaultMessage;
        }
        this.renderer.setProperty(errorAlert, 'innerHTML', fullError);

        this.addCloseButton(errorAlert);

        if (error.detailsMessages && error.detailsMessages.length > 0) {
            let details: HTMLBaseElement = this.renderer.createElement('ul');
            for (let detailValue of error.detailsMessages) {
                let detail: HTMLBaseElement = this.renderer.createElement('li');
                this.renderer.setProperty(detail, 'innerHTML', detailValue);
                this.renderer.appendChild(details, detail);
            }
            this.renderer.appendChild(errorAlert, details)
        }
        
    
        this.renderer.appendChild(document.body, errorAlert);
        
        let that =this;
        setTimeout(function() {
            that.fadeAwayElement(errorAlert);

        }, 4000);
        setTimeout(function() {
            errorAlert.remove();
        }, 6000); 
        
    }


    private addCloseButton(alert: HTMLBaseElement) {
        let closeButton: HTMLBaseElement = this.renderer.createElement('button');
        this.renderer.setAttribute(closeButton, 'type', 'button');
        this.renderer.addClass(closeButton, 'btn-close');
        this.renderer.setAttribute(closeButton, 'data-bs-dismiss', 'alert');
        this.renderer.setAttribute(closeButton, 'aria-label', 'Close');
        this.renderer.appendChild(alert, closeButton);
    }

    private fadeAwayElement(element: HTMLBaseElement) {
        this.renderer.setStyle(element, 'transition', 'opacity 2s');
        this.renderer.setStyle(element, 'opacity', '0');
    }

    
  }