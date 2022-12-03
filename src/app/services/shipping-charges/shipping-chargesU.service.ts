import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UPSAccount } from './ups_account.model';
import { UPS_RSS } from './ups_rss.model';
import * as converter from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class ShippingChargesUService {

  $xmlParser: any;
  constructor(private httpClient: HttpClient) { }

  getShipVias() {
    let shipVias = [{
      'ShipViaCode': 'GND',
      'ShipVia': 'UPS Ground',
      'shipcost': 0
    }, {
      'ShipViaCode': '1DA',
      'ShipVia': 'UPS Next Day Air',
      'shipcost': 0
    }, {
      'ShipViaCode': '2DA',
      'ShipVia': 'UPS 2nd Day Air',
      'shipcost': 0
    }, {
      'ShipViaCode': '3DS',
      'ShipVia': 'UPS 3 Day Select',
      'shipcost': 0
    }, {
      'ShipViaCode': 'FGD',
      'ShipVia': 'FedEx Ground',
      'shipcost': 0
    }, {
      'ShipViaCode': 'F2D',
      'ShipVia': 'FedEx 2-DAY',
      'shipcost': 0
    }, {
      'ShipViaCode': 'FSO',
      'ShipVia': 'FedEx Overnight',
      'shipcost': 0
    }];
    return shipVias;
  }

  getShipCostPolicy() {
    let shipCosts = [{
      'ShipCostCode': 'ZERO',
      'ShipCost': 'Free',
    }, {
      'ShipCostCode': 'TABLE',
      'ShipVia': 'Based on a Table',
    }, {
      'ShipCostCode': 'QTYTABLE',
      'ShipVia': 'Based on a Table by Quantities',
    }, {
      'ShipCostCode': 'FEDEX',
      'ShipVia': 'Federal Express',
    }, {
      'ShipCostCode': 'UPS',
      'ShipVia': 'United Parcel Service',
    }, {
      'ShipCostCode': 'SPECIAL',
      'ShipVia': 'Special rule by Account',
    }];
    return shipCosts;
  }

  getShipViaCosts(accountShippingPolicy: string, number_items: number, account_ID: number, account_handlingfee: number, accFreeShipCount: number, accFreeShipAmount: number, shipto_zip: string, shipping_lbs: number, db: any) {
    let subtotal = 0
    let shipVias = this.getShipVias();
    shipVias.forEach(x => {
      if (x.ShipViaCode == 'FGD' || x.ShipViaCode == 'GND') {
        if (subtotal > 0) {
          if (accountShippingPolicy == 'ZERO')
            x.shipcost = 0
          if (accountShippingPolicy == 'TABLE')
            x.shipcost = this.getShippingCostFromTable(subtotal)
          if (accountShippingPolicy == 'QTYTABLE')
            x.shipcost = this.getShippingCostFromQtyTable(number_items, account_ID)
          if (accountShippingPolicy == 'FEDEX' || accountShippingPolicy == 'UPS')
            x.shipcost = this.getShippingCost(subtotal, 'FGD', shipto_zip, shipping_lbs, 'GET_TRUE_FEDEX_COST', db)
          if (accountShippingPolicy == 'RESIDENTIAL')
            x.shipcost += account_handlingfee
        }
        else
          x.shipcost = 0

        //FREE SHIPING BASED ON NUMBER OF ITEMS
        if (number_items > accFreeShipCount && accFreeShipCount > 0)
          x.shipcost = 0

        //FREE SHIPING BASED ON AMOUNT
        if (subtotal > accFreeShipAmount && accFreeShipAmount > 0)
          x.shipcost = 0
      }
      else if (x.ShipViaCode == 'F2D') {
        x.shipcost = this.getShippingCost(subtotal, 'F2D', shipto_zip, shipping_lbs, account_ID, db)
      }
      else if (x.ShipViaCode == 'FSO') {
        x.shipcost = this.getShippingCost(subtotal, 'FSO', shipto_zip, shipping_lbs, account_ID, db)
      }
      else if (x.ShipViaCode == '1DA') {
        x.shipcost = this.getShippingCost(subtotal, '1DA', shipto_zip, shipping_lbs, account_ID, db)
      }
      else if (x.ShipViaCode == '2DA') {
        x.shipcost = this.getShippingCost(subtotal, '2DA', shipto_zip, shipping_lbs, account_ID, db)
      }
      else if (x.ShipViaCode == '3DS') {
        x.shipcost = this.getShippingCost(subtotal, '3DS', shipto_zip, shipping_lbs, account_ID, db)
      }
    })
    return shipVias;
  }

  getShippingCostFromTable(subtotal: number) {
    let shipCost = 0;
    let extra = 0;
    if (subtotal <= 50) {
      shipCost = 10.10;
    }
    else {
      extra = subtotal / 50;
      shipCost = 10.10 + extra * 1.45;
    }
    return shipCost
  }

  getShippingCostFromQtyTable(number_items: number, account_ID: number) {
    let shipcost = 0;
    if (account_ID == 268) // Stop And Shop
      if (number_items == 1)
        shipcost = 9.00;
      else
        shipcost = 12.00;
    else
      shipcost = 10 + ((number_items - 1) * 5);
    return shipcost
  }

  getShippingCost(subtotal: number, shipvia: string, shiptozip: string, shiplbs: number, AccountID: any, db: any) {
    let UPS_numboxes: any = 1;
    let $NumberOfShippingItems: number;
    let account_HANDLINGFEE: number = 0;
    let shipcost = 0;

    if (AccountID == 'GET_TRUE_UPS_COST') {
      this.getUPSprice(shipvia, '27410', shiptozip, 'US', shiplbs, AccountID, db).then(res => {
        shipcost = res + (account_HANDLINGFEE * UPS_numboxes)
      })
    }
    else if (AccountID == 'GET_TRUE_FEDEX_COST') {
      this.getFEDEXprice(shipvia, '27410', shiptozip, 'US', shiplbs, AccountID, db).then(res => {
        shipcost = res + (account_HANDLINGFEE * UPS_numboxes)
      })
    }
    else
      if (UPS_numboxes < 1)
        UPS_numboxes = 1

    this.getUPSprice(shipvia, '27410', shiptozip, 'US', shiplbs, AccountID, db).then(res => {
      shipcost = res + (account_HANDLINGFEE * UPS_numboxes)
    })

    return shipcost;
  }

  async getUPSprice(shipType: string, sendZipcode: string, receiveZipcode: string, receiveCountry: string, weight: number, acctid: string, db: any) {
    let ups_rss: UPS_RSS = new UPS_RSS();	// object is necessarily instantiated in ups.inc.php
    let ups_acct: any;
    let UPS_numboxes;
    let tmpweight = 0;
    UPS_numboxes = 0;
    let shipcost = 0;

    // Convert shiptype to standard UPS service codes
    switch (shipType) {
      case '1DA': shipType = '01'; break
      case '2DA': shipType = '02'; break
      case 'GND': shipType = '03'; break
      case '3DS': shipType = '12'; break
      default: shipType = '03'; break
    }

    sendZipcode = sendZipcode.substring(0, 5);
    receiveZipcode = receiveZipcode.substring(0, 5);

    // Start RSS request
    ups_acct = new UPSAccount("9BB144FBC22FC99A", "delktech", "dalkyl")
    ups_rss.SetAccount(ups_acct)
    ups_rss.StartRequest(sendZipcode, receiveZipcode)

    while (weight > 0) {
      if (weight > 70)
        tmpweight = 70
      else
        tmpweight = weight;

      ups_rss.AddPackage(12, 12, 12, tmpweight)
      weight -= tmpweight;
      UPS_numboxes++
    }
    return await  ups_rss.SubmitURL(this.httpClient).then((data: any) => {
      let $rawXmlResponse = data;
      let result1 = converter.xml2json($rawXmlResponse, { compact: true, spaces: 2 });
      this.$xmlParser = JSON.parse(result1);
      let objShipcost = this.$xmlParser.RatingServiceSelectionResponse.RatedShipment.find((x: any) => x.Service.Code._text == shipType);
      debugger;
      shipcost = objShipcost ? +parseFloat(objShipcost.TotalCharges.MonetaryValue._text).toFixed(2) : 0;
      return shipcost;
    }).catch(err => {
      return shipcost;
    }).finally(() => { return shipcost });
  }

  async getFEDEXprice(shipType: string, sendZipcode: string, receiveZipcode: string, receiveCountry: string, weight: number, acctid: string, db: any) {
    let ups_rss: UPS_RSS = new UPS_RSS();	// object is necessarily instantiated in ups.inc.php
    let ups_acct;
    let UPS_numboxes;
    UPS_numboxes = 0;
    let tmpweight = 0;
    let shipcost = 0;

    // Convert shiptype to standard UPS service codes
    switch (shipType) {
      case 'FSO': shipType = '01'; break
      case 'F2D': shipType = '02'; break
      case 'FGD': shipType = '03'; break
      case '3DS': shipType = '12'; break
      default: shipType = '03'; break
    }	// TODO: confirm that this may be a bad assumption

    sendZipcode = sendZipcode.substring(0, 5);
    receiveZipcode = receiveZipcode.substring(0, 5);

    // Start RSS request
    ups_acct = new UPSAccount("9BB144FBC22FC99A", "delktech", "dalkyl");
    ups_rss.SetAccount(ups_acct)
    ups_rss.StartRequest(sendZipcode, receiveZipcode)

    while (weight > 0) {
      if (weight > 70)
        tmpweight = 70
      else
        tmpweight = weight

      ups_rss.AddPackage(12, 12, 12, tmpweight)
      weight -= tmpweight
      UPS_numboxes++
    }
    return await ups_rss.SubmitURL(this.httpClient).then((data: any) => {
      let $rawXmlResponse = data;
      let result1 = converter.xml2json($rawXmlResponse, { compact: true, spaces: 2 });
      this.$xmlParser = JSON.parse(result1);
      let objShipcost = this.$xmlParser.RatingServiceSelectionResponse.RatedShipment.find((x: any) => x.Service.Code._text == shipType);
      debugger;
      shipcost = objShipcost ? +parseFloat(objShipcost.TotalCharges.MonetaryValue._text).toFixed(2) : 0;
      return shipcost;
    }).catch(err => {
      return shipcost;
    }).finally(() => { return shipcost })
  }
}
