export const mailTemplate = async (header: string, message: string) => {
  return {
    template: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="telephone=no" name="format-detection">
      <title></title>
      <!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]-->
      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
      <!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  </head>
  
  <body>
      <div class="es-wrapper-color">
          <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
      <![endif]-->
          <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
              <tbody>
                  <tr>
                      <td class="esd-email-paddings" valign="top">
                          <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                          <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p20" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-infoblock">
                                                                                          <p><a target="_blank">View online version</a></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-header" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center" esd-custom-block-id="388981">
                                          <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p10t es-p10b es-p20r es-p20l" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://mbcirw.stripocdn.email/content/guids/CABINET_37653718160e384c1b6ac6f5fb44958e/images/86381617879516269.png" alt style="display: block;" width="300"></a></td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-p20t es-p10b es-m-txt-c">
                                                                                          <h3 style="line-height: 100%;">${header}</h3>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-p5t es-p5b">
                                                                                          <p>${message}</p>
                                                                                          <p>The sale lasts from May 30th through June 30th.&nbsp;</p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-p15t es-p5b es-p20r es-p20l es-m-txt-c">
                                                                                          <h2>How does it work?</h2>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p20" align="left">
                                                          <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="194" valign="top"><![endif]-->
                                                          <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="174" class="es-m-p0r es-m-p20b esd-container-frame" align="center">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://mbcirw.stripocdn.email/content/guids/CABINET_37653718160e384c1b6ac6f5fb44958e/images/2851617878322771.png" alt style="display: block;" width="45"></a></td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                          <p>Choose any piece of clothing that you like.</p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                      <td class="es-hidden" width="20"></td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td width="173" valign="top"><![endif]-->
                                                          <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="173" class="es-m-p20b esd-container-frame" align="center">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://mbcirw.stripocdn.email/content/guids/CABINET_37653718160e384c1b6ac6f5fb44958e/images/2851617878322771.png" alt style="display: block;" width="45"></a></td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                          <p>At the checkout, redeem your promo code.</p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td width="20"></td><td width="173" valign="top"><![endif]-->
                                                          <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="173" align="center" class="esd-container-frame">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://mbcirw.stripocdn.email/content/guids/CABINET_37653718160e384c1b6ac6f5fb44958e/images/2851617878322771.png" alt style="display: block;" width="45"></a></td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                          <p>Wait for your order to come. Enjoy!</p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center" esd-custom-block-id="388980">
                                          <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="640" style="background-color: transparent;">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="600" class="esd-container-frame" align="left">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                          <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td align="center" valign="top" class="es-p40r"><a target="_blank" href><img title="Facebook" src="https://mbcirw.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32"></a></td>
                                                                                                      <td align="center" valign="top" class="es-p40r"><a target="_blank" href><img title="Twitter" src="https://mbcirw.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32"></a></td>
                                                                                                      <td align="center" valign="top" class="es-p40r"><a target="_blank" href><img title="Instagram" src="https://mbcirw.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32"></a></td>
                                                                                                      <td align="center" valign="top"><a target="_blank" href><img title="Youtube" src="https://mbcirw.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32"></a></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-p35b">
                                                                                          <p>Style Casual&nbsp;© 2021 Style Casual, Inc. All Rights Reserved.</p>
                                                                                          <p>4562 Hazy Panda Limits, Chair Crossing, Kentucky, US, 607898</p>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#cccccc" esd-tmp-menu-color="#999999">
                                                                                          <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                              <tbody>
                                                                                                  <tr class="links">
                                                                                                      <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://" style="color: #999999;">Visit Us </a></td>
                                                                                                      <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;"><a target="_blank" href="https://" style="color: #999999;">Privacy Policy</a></td>
                                                                                                      <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;"><a target="_blank" href="https://" style="color: #999999;">Terms of Use</a></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                          <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p20" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="esd-block-text es-infoblock">
                                                                                          <p><a target="_blank"></a>No longer want to receive these emails?&nbsp;<a href target="_blank">Unsubscribe</a>.<a target="_blank"></a></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </body>
  
  </html>`,
  };
};
