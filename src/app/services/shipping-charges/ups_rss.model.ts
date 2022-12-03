import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export class UPS_RSS {
    $url = "http://localhost:5000/api/xml/getUpsRates";//forced to create this because TLS 

    $userAgent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)";
    $account: any;
    $out: any;
    $xmlState: any;
    $rateData: any;
    $xmlParser: any;
    constructor() {

    }
    SetAccount($account: any) {
        this.$account = $account;
    }

    StartRequest($toZip: string, $fromZip: string) {
        // Reset and add the account info.
        this.$out = this.$account.GetAccessRequest();

        // Add the initial tags to the request.
        this.$out += "<?xml version='1.0' ?> " +
            "<RatingServiceSelectionRequest xml:lang = 'en-US'>" +
            "<Request><TransactionReference>" +
            "<CustomerContext>Delktech Rate Request </CustomerContext>" +
            "<XpciVersion> 1.0001 </XpciVersion>" +
            "</TransactionReference>" +
            "<RequestAction> Rate </RequestAction>" +
            "<RequestOption> Shop </RequestOption>" +
            "</Request>" +
            "<PickupType> <Code>01</Code>" +
            "</PickupType>" +
            "<Shipment><Shipper><Address><PostalCode>" + $toZip + "</PostalCode><CountryCode> US </CountryCode>" +
            "</Address></Shipper><ShipTo><Address>" +
            "<PostalCode>" + $toZip + " </PostalCode>" +
            "<CountryCode> US </CountryCode>" +
            "</Address></ShipTo>" +
            "<ShipFrom><Address><PostalCode>" + $fromZip + "</PostalCode><CountryCode> US </CountryCode>" +
            "</Address></ShipFrom><Service><Code>03</Code></Service>";

        // Initialize the XML data structures.
        this.$rateData = [];
        this.$xmlState = '';
        // }
    }

    AddPackage($length: number, $width: number, $height: number, $weight: number) {
        this.$out += "<Package><PackagingType><Code>02 </Code>" +
            "</PackagingType><Dimensions><UnitOfMeasurement><Code>IN </Code>" +
            "</UnitOfMeasurement><Length>" + $length + "</Length><Width>" + $width + "</Width><Height>" + $height + "</Height></Dimensions>" +
            "<PackageWeight><UnitOfMeasurement><Code>LBS </Code>" +
            "</UnitOfMeasurement><Weight>" + $weight + "</Weight>" +
            "</PackageWeight></Package>";
    }

    // PRIVATE helper function.  Should not be called externally.
    // FinalizeRequest() completes the XML request.  Calling it implies that all
    // packages have now been added.
    FinalizeRequest() {
        // Finalize the request.
        this.$out += "</Shipment></RatingServiceSelectionRequest>";
    }

    // PRIVATE helper function.  Should not be called externally.
    // Generate the https request to the UPS server.
    async SubmitURL(httpClient: HttpClient) {
        let $result: any;
        this.FinalizeRequest();
        let headers = new HttpHeaders()
            .set('Content-Type', 'text/xml')
            .set('Accept', 'application/xml');
        return await httpClient.post(this.$url, this.$out, { headers: headers });
        // Build the libcurl request.	
        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_POST, 1);
        // curl_setopt($ch, CURLOPT_URL, $this -> url);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        // curl_setopt($ch, CURLOPT_USERAGENT, $this -> userAgent);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $this -> out);

        // $result = curl_exec($ch);
        // curl_close($ch);

        // return $result;
    }

    // Complete the request and submit it to the UPS server for processing.
    // SubmitRequest(httpClient: HttpClient): Observable<any> {
    //     // Initialize XML parser.
    //     // if (!($this -> xmlParser = xml_parser_create()) ) {
    //     //     die("Couldn't create parser.");
    //     // }
    //     // xml_set_element_handler($this -> xmlParser,
    //     //     "RSSStartElementHandler",
    //     //     "RSSEndElementHandler");
    //     // xml_set_character_data_handler($this -> xmlParser,
    //     //     "RSSCharacterDataHandler");

    //     // $this -> FinalizeRequest();

    //     // // Handle the actual request.
    //     // $rawXmlResponse = $this -> SubmitURL();

    //     // // Get all useful data from the XML response.
    //     // xml_parse($this -> xmlParser, $rawXmlResponse);
    //     // xml_parser_free($this -> xmlParser);

    //     // return $this -> rateData;
    //     return this.SubmitURL(httpClient);

    //     return this.$xmlParser;
    // }
}