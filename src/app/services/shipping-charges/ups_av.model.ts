import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as converter from 'xml-js';

export class UPS_AV {

    $url = "http://app.technomerge.com/apps/ups/xml_AV.php";//forced to create this because TLS 

    $userAgent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)";
    $account: any;
    $out: any;

    // Members variables used to manage the XML parser.
    $xmlParser: any;
    $xmlState: any;

    // Member variable arrays to manage the results.
    $matches: any[] = [];
    $currentMatch: any[] = [];

    constructor(private httpClient: HttpClient) {

    }

    SetAccount($account: any) {
        this.$account = $account;
    }

    StartRequest($city: string, $state: string, $zip: string) {
        // Reset and add the account info.
        this.$out = this.$account.GetAccessRequest();

        // Add the initial tags to the request.
        this.$out += "<?xml version='1.0'?><AddressValidationRequest xml:lang='en-US'><Request>" +
            "<TransactionReference><CustomerContext>Delktech Rate Request < /CustomerContext>< XpciVersion > 1.0001 < /XpciVersion>" +
            "</TransactionReference><RequestAction > AV </RequestAction>" +
            "</Request><Address>";
        // Make sure we generate a valid request.  Valid requests can have any combination of
        // city, state, or ZIP included, except for (a) all blank input or (b) state only.
        // This guarantees neither of those cases can happen.  Probably not the best approach.
        if (($city == "") && ($zip == "")) {
            $city = "Greensboro";
            $state = "NC";
        }
        if ($city != "") {
            this.$out += "<City>" + $city + "</City>\n";
        }
        if ($state != "") {
            this.$out += "<StateProvinceCode>" + $state + "</StateProvinceCode>\n";
        }
        if ($zip != "") {
            this.$out += "<PostalCode>" + $zip + "</PostalCode>\n";
        }

        // Add the final tags to the request.
        this.$out += "</Address></AddressValidationRequest>";

        // Initialize the XML data structures.
        this.$matches = [];
        this.$xmlState = '';
    }

    // PRIVATE helper function.  Should not be called externally.
    SubmitURL() {
        let $result: any;
        let headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set('Content-Type', 'application/xml');
        return this.httpClient.post(this.$url, this.$out, { headers: headers })
    }

    // Submits the request, and returns an array of match records (arrays).
    SubmitRequest() {
        // Initialize XML parser.
        // if (!(this.$xmlParser = xml_parser_create())) {
        //     die("Couldn't create parser.");
        // }
        // xml_set_element_handler(this.$xmlParser,
        //     "AVStartElementHandler",
        //     "AVEndElementHandler");
        // xml_set_character_data_handler(this.$xmlParser,
        //     "AVCharacterDataHandler");

        // Handle the actual request.
        this.SubmitURL().subscribe((data: any) => {
            debugger;
            let $rawXmlResponse = data;
            let result1 = converter.xml2json($rawXmlResponse, { compact: true, spaces: 2 });
            this.$matches = JSON.parse(result1);
        }, err => {
            console.log(err);
        });

        return this.$matches;

    }
}