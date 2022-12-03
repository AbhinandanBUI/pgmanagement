export class UPSAccount {
    // Member variables used to manage the UPS account.
    $UPSAccessKey: string;
    $UPSUserID: string;
    $UPSPassword: string;

    // Constructor.
    constructor($key: string, $id: string, $pass: string) {
        this.$UPSAccessKey = $key;
        this.$UPSUserID = $id;
        this.$UPSPassword = $pass;
    }

    // Generates access request
    GetAccessRequest() {
        // Build request.
        let $result = "<?xml version = '1.0'?>" +
            "<AccessRequest xml:lang = 'en-US' >" +
            "<AccessLicenseNumber>" + this.$UPSAccessKey + "</AccessLicenseNumber>" +
            "<UserId>" + this.$UPSUserID + "</UserId>" +
            "<Password>" + this.$UPSPassword + "</Password>" +
            "</AccessRequest>";

        return $result;
    }
}