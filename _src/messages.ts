import {
  RequestStateType,
  EventRequestStartType
} from './ts-types';

import {EVENT_REQUEST_START, REQUEST_ADD, REQUEST_CHANGE} from './ajax-api';
import {getCartState} from './state';
import {settings} from './settings';
import {DATA_ATTR_PREFIX} from "./const";
import {HTMLProductFormElement} from "./controls/product-form-element";

const DATA_ATTR_ERRORS = `${DATA_ATTR_PREFIX}-errors`;

function getRequestError(requestState: RequestStateType): string {

  const {requestErrorText} = settings;

  if (requestState.responseData?.ok) return '';

  if ('responseData' in requestState) {
    if ('description' in requestState.responseData.body && requestState.responseData.body.description) {
      return <string>requestState.responseData.body.description
    }
    if ('message' in requestState.responseData.body && requestState.responseData.body.message) {
      return <string>requestState.responseData.body.message
    }
  }

  return requestErrorText;
}

const changeRequestContainers = (requestState: RequestStateType): NodeListOf<Element> => {
  let errorContainers: NodeListOf<Element>;

  // const {messagesAttribute} = settings.computed;
  const state = getCartState();

  let requestedId: string,
    requestedLine: string;

  if (requestState.requestBody instanceof FormData || requestState.requestBody instanceof URLSearchParams) {
    if (requestState.requestBody.has('line')) {
      requestedLine = requestState.requestBody.get('line').toString();
    }
    if (requestState.requestBody.has('id')) {
      requestedId = requestState.requestBody.get('id').toString();
    }
  } else {
    if ('line' in requestState.requestBody) {
      requestedLine = String(requestState.requestBody.line);
    }
    if ('id' in requestState.requestBody) {
      requestedId = String(requestState.requestBody.id);
    }
  }

  if (requestedLine) {
    const requestedLineNumber = Number(requestedLine);
    if (requestedLineNumber > 0) {
      const lineItemIndex = requestedLineNumber - 1;
      requestedId = state.cart.items[lineItemIndex]?.key;
    }
  }

  if (requestedId) {
    if (requestedId.indexOf(':') > -1) {
      errorContainers = document.querySelectorAll(`[${DATA_ATTR_ERRORS}="${requestedId}"]`);
    } else {
      errorContainers = document.querySelectorAll(
        state.cart.items.reduce((acc, element) => {
          if (element.key === requestedId || element.id === Number(requestedId)) {
            acc.push(`[${DATA_ATTR_ERRORS}="${element.key}"]`);
          }
          return acc;
        }, []).join(',')
      );
    }
  }
  return errorContainers;
}

const addRequestContainers = (requestState: RequestStateType): NodeListOf<Element> => {
  let errorContainers: NodeListOf<Element>;
  const initiator: Element = requestState.info?.initiator;
  if (initiator instanceof HTMLProductFormElement) {
    errorContainers = initiator.querySelectorAll(`[${DATA_ATTR_ERRORS}="form"]`);
  }
  return errorContainers;
}

const cartMessagesInit = () => {
  document.addEventListener(EVENT_REQUEST_START, (event: EventRequestStartType) => {
    const {requestState, onResult} = event.detail;

    let errorContainers: NodeListOf<Element>;

    if (requestState.requestType === REQUEST_ADD)
      errorContainers = addRequestContainers(requestState);
    else if (requestState.requestType === REQUEST_CHANGE)
      errorContainers = changeRequestContainers(requestState);

    if (errorContainers && errorContainers.length > 0) {
      errorContainers.forEach((element) => {
        element.textContent = '';
      });

      onResult((requestState) => {
        if (requestState.info.cancel) return;

        const errorMessage = getRequestError(requestState);
        if (errorMessage) {
          errorContainers.forEach((element: Element) => {
            element.textContent = errorMessage;
          });
        }
      });
    }
  });
};

export {cartMessagesInit}