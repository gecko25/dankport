const source =
'<body fontsize="10" style="font-family: verdana; font-size: 10pt; color: #000;">'+
'    <center>'+
'        <table width="60%">'+
'            <tr>'+
'                <td>'+
'                    {{! The `context` variable can be used to show information depending on the context the template is used for. It can be Email, Pdf or Html.}}'+
'                    {{ #if_eq context \'Email\' }}'+
'                    <p style="margin: 0 0 10px;">'+
'                        Success! Your order has been placed.'+
'                    </p>'+
''+
'                    {{! When a refund is passed to the template it means that the email will be sent after a refund has been issued. }}'+
'                    {{ #if refund }}'+
'                    <p>'+
'                        {{ #if_eq order.summary.adjustedTotal 0 }}'+
'                        We\'ve fully refunded your order on {{ settings.businessAddress.company }}. You can find the details below.'+
'                        {{ else }}'+
'                        {{ money refund.amount }} have been refunded on your order on {{ settings.businessAddress.company }}. You can find the details below.'+
'                        {{ /if_eq }}'+
'                    </p>'+
'                    {{ #if refund.notifyCustomer }}'+
'                    <p>'+
'                        {{{ refund.comment }}}'+
'                    </p>'+
'                    {{ /if }}'+
'                    {{ /if }}'+
'                    {{ /if_eq }}'+
''+
'                    <table style="border-bottom: solid 1px #333333" width="100%" cellpadding="5" id="header">'+
'                        <tr>'+
'                            <td>'+
'                                <span size="10" color="#333333" style="color: #333333; font-size: 14pt;">'+
'                                    <strong>'+
'                                        {{! using the `order` object you have access to the whole order information and can display relevant information in the invoice. }}'+
'                                        {{ order.invoiceNumber }}'+
'                                    </strong>'+
'                                </span>'+
'                            </td>'+
'                            <td align="right">'+
'                                <span size="10" color="#333333" style="color: #333333; font-size: 14pt; text-align: left">'+
'                                    <strong>'+
'                                        {{ date order.completionDate }}'+
'                                    </strong>'+
'                                </span>'+
'                            </td>'+
'                        </tr>'+
'                    </table>'+
''+
'                    <table width="100%" cellpadding="5" id="business" style="border-bottom: solid 1px #333">'+
'                        <tr>'+
'                            <td width="50%" valign="top">'+
'                                {{! Using `settings` object you\'ll be able to access some information about the account, such as the billing address or the logoUrl. }}'+
'                                {{ #with settings.businessAddress }}'+
'                                <p size="9">'+
'                                    <b>'+
'                                        {{company}}'+
'                                    </b>'+
''+
'                                    <br />'+
''+
'                                    {{ #if address1 }}'+
'                                    {{ address1 }}'+
'                                    <br />'+
'                                    {{ /if }}'+
''+
'                                    {{ #if address2 }}'+
'                                    {{ address2 }}'+
'                                    <br />'+
'                                    {{ /if }}'+
''+
'                                    {{ #if city }}'+
'                                    {{ city }},'+
'                                    {{ /if }}'+
''+
'                                    {{ #if province }}'+
'                                    {{ province }},'+
'                                    {{ /if }}'+
''+
'                                    {{ #if country }}'+
'                                    {{ country }}'+
'                                    <br />'+
'                                    {{ /if }}'+
''+
'                                    {{ #if postalCode }}'+
'                                    {{ businessAdress.postalCode }}'+
'                                    {{ /if }}'+
''+
'                                </p>'+
'                                {{ /with }}'+
'                            </td>'+
''+
'                            {{ #if settings.logoUrl }}'+
'                            <td width="50%" align="right">'+
'                                <img src="{{ settings.logoUrl }}" style="max-height: 80px;" />'+
'                            </td>'+
'                            {{ /if }}'+
'                        </tr>'+
'                    </table>'+
'                    <table width="100%" cellpadding="5" cellspacing="0" style="border-bottom: solid 1px #333">'+
'                        <tr>'+
'                            <td width="50%" valign="top">'+
'                                <h3 size="12">Billing address</h3>'+
'                                <div></div>'+
'                                <p size="9">'+
'                                    {{ #with order.billingAddress }}'+
'                                    {{ fullName }}'+
'                                    <br />'+
''+
'                                    {{ #if company }}'+
'                                    {{ company }}'+
'                                    <br />'+
'                                    {{ /if }}'+
''+
'                                    {{ ../order.email }}'+
''+
'                                    <br /><br />'+
''+
'                                    {{ address1 }}'+
'                                    <br />'+
''+
'                                    {{ #if address2 }}'+
'                                    {{ address2 }}'+
'                                    <br />'+
'                                    {{ /if }}'+
''+
'                                    {{ city }},'+
''+
'                                    {{ #if province }}'+
'                                    {{ province }},'+
'                                    {{ /if }}'+
''+
'                                    {{ country }}'+
'                                    <br />'+
''+
'                                    {{ postalCode }}'+
''+
'                                    <br />'+
''+
'                                    {{ phone }}'+
'                                    {{ /with }}'+
'                                </p>'+
'                            </td>'+
''+
'                            {{ #if order.shippingAddress }}'+
''+
'                            {{ #with order.shippingAddress }}'+
'                            <td width="50%" valign="top">'+
'                                <h3 size="12">'+
'                                    Shipping address'+
'                                </h3>'+
''+
'                                <p size="9">'+
'                                    {{ fullName }}'+
''+
'                                    <br />'+
''+
'                                    {{ #if company }}'+
'                                    {{ company }}'+
'                                    <br />'+
'                                    {{ /if }}'+
''+
'                                    <br />'+
''+
'                                    {{ address1 }}'+
''+
'                                    <br />'+
''+
'                                    {{ #if address2 }}'+
'                                    {{ address2 }}'+
'                                    <br />'+
'                                    {{ /if }}'+
''+
'                                    {{ city }},'+
''+
'                                    {{ #if province }}'+
'                                    {{ province }},'+
'                                    {{ /if }}'+
''+
'                                    {{ country }}'+
''+
'                                    <br />'+
''+
'                                    {{ postalCode }}'+
''+
'                                    <br />'+
''+
'                                    {{ phone }}'+
'                                </p>'+
'                            </td>'+
'                            {{ /with }}'+
'                            {{ /if }}'+
'                        </tr>'+
'                    </table>'+
''+
''+
'                    {{ #has_any order.customFields }}'+
'                    <table width="100%" cellpadding="5" cellspacing="0">'+
'                        <tr>'+
'                            <td>'+
'                                <h3 size="12">Your order</h3>'+
''+
'                                <ul>'+
'                                    {{ #each order.customFields }}'+
'                                        {{ #if_not_eq type \'hidden\' }}'+
'                                            <li style="list-style-type: square">'+
'                                                <span size="9">'+
'                                                    {{ cleanHtml name }}: {{ cleanHtml value }}'+
'                                                </span>'+
'                                            </li>'+
'                                        {{ /if_not_eq}}'+
'                                    {{ /each }}'+
'                                </ul>'+
'                            </td>'+
'                        </tr>'+
'                    </table>'+
'                    {{ /has_any }}'+
''+
'                    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">'+
'                        <thead>'+
'                            <tr>'+
'                                <td align="left" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">'+
'                                    <span color="#333333" size="10">'+
'                                        <strong>ID</strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="left" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;"></td>'+
'                                <td align="left" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">'+
'                                    <span color="#333333" size="10">'+
'                                        <strong>Name</strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="center" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">'+
'                                    <span color="#333333" size="10">'+
'                                        <strong>Quantity</strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">'+
'                                    <span color="#333333" size="10">'+
'                                        <strong>Unit price</strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">'+
'                                    <span color="#333333" size="10">'+
'                                        <strong>Total price</strong>'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                        </thead>'+
'                        <tbody>'+
'                            {{ #each order.items }}'+
'                            <tr>'+
'                                <td style="border-bottom: solid 1px #ccc; padding: 5px;">'+
'                                    <span size="10">'+
'                                        {{ this.id }}'+
'                                    </span>'+
'                                </td>'+
'                                {{ #if ../settings.includeProductImagesInInvoice }}'+
'                                {{ #is_absolute_url this.image }}'+
'                                <td valign="top" align="right" style="border-bottom: solid 1px #ccc;">'+
'                                    <img src="{{ this.image }}" style="margin-right: 5px; max-width: 75px;" height="75" width="75" />'+
'                                </td>'+
'                                {{ else }}'+
'                                <td style="border-bottom: solid 1px #ccc;"></td>'+
'                                {{ /is_absolute_url }}'+
'                                {{ else }}'+
'                                <td style="border-bottom: solid 1px #ccc;"></td>'+
'                                {{ /if }}'+
''+
'                                <td style="border-bottom: solid 1px #ccc;">'+
'                                    <span size="10">'+
'                                        <strong>'+
'                                            {{ this.name }}'+
'                                        </strong>'+
'                                    </span>'+
''+
'                                    {{ #if this.description }}'+
'                                    <p size="9">'+
'                                        {{{ this.description }}}'+
'                                    </p>'+
'                                    {{ /if }}'+
''+
'                                    {{ #has_any this.customFields }}'+
'                                    <ul>'+
'                                        {{ #each this.customFields }}'+
'                                        {{ #if_not_eq type \'hidden\' }}'+
'                                        <li style="list-style-type: square">'+
'                                            <span size="9">'+
'                                                {{ cleanHtml name }}: {{ cleanHtml value }}'+
'                                            </span>'+
'                                        </li>'+
'                                        {{ /if_not_eq }}'+
'                                        {{ /each }}'+
'                                    </ul>'+
'                                    {{ /has_any }}'+
'                                </td>'+
'                                <td style="border-bottom: solid 1px #ccc; padding: 5px;" align="center">'+
'                                    {{ this.quantity }}'+
'                                </td>'+
'                                <td style="border-bottom: solid 1px #ccc; padding: 5px;" align="right">'+
'                                    {{ money this.unitPrice }}'+
'                                </td>'+
'                                <td style="border-bottom: solid 1px #ccc; padding: 5px;" align="right">'+
'                                    {{ money this.totalPrice }}'+
'                                </td>'+
'                            </tr>'+
'                            {{ /each }}'+
''+
'                            {{ #each order.plans }}'+
'                            <tr>'+
'                                <td align="center" style="border-bottom: solid 1px #ccc; padding: 5px;">'+
'                                    <span size="10">'+
'                                        {{ this.id }}'+
'                                    </span>'+
'                                </td>'+
'                                <td style="border-bottom: solid 1px #ccc;"></td>'+
'                                <td style="border-bottom: solid 1px #ccc;">'+
'                                    <span size="10">'+
'                                        <strong>'+
'                                            {{ this.name }}'+
'                                        </strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="center" style="border-bottom: solid 1px #ccc; padding: 5px;">'+
'                                    <span size="9">'+
'                                        {{ this.quantity }}'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px; white-space: nowrap">'+
'                                    <span size="9">'+
'                                        {{ money this.amount }}/{{ this.interval }}'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px; white-space: nowrap">'+
'                                    <span size="9">'+
'                                        {{ money this.totalAmount }}/{{ this.interval }}'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                            {{ /each }}'+
''+
'                            {{ #each order.discounts }}'+
'                            <tr>'+
'                                <td colspan="5" style="border-bottom: solid 1px #ccc; padding: 5px;">'+
'                                    <span size="9">'+
'                                        {{ name }}'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px;">'+
'                                    <span size="9" color="red" style="color: red;">'+
'                                        {{ money value }}'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                            {{ /each }}'+
''+
'                            {{ #if_not_eq order.summary.discountInducedTaxesVariation 0 }}'+
'                            <tr>'+
'                                <td colspan="5" style="border-bottom: solid 1px #ccc; padding: 5px;">'+
'                                    <span size="9">'+
'                                        Tax adjustments'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px;">'+
'                                    <span size="9" color="red" style="color: red;">'+
'                                        {{ money order.summary.discountInducedTaxesVariation }}'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                            {{ /if_not_eq }}'+
''+
'                            <tr>'+
'                                <td colspan="5" style="border-bottom: solid 1px #ccc; padding: 15px 5px;">'+
'                                    <span size="9">'+
'                                        <strong>'+
'                                            Subtotal'+
'                                        </strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 15px 5px;">'+
'                                    <span size="9">'+
'                                        <strong>'+
'                                            {{ money order.summary.subTotal }}'+
'                                        </strong>'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
''+
'                            {{ #if order.shippingInformation }}'+
'                            <tr>'+
'                                <td colspan="5" style="border-bottom: solid 1px #ccc; padding: 5px">'+
'                                    <span size="9">'+
'                                        {{ order.shippingInformation.method }}'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px">'+
'                                    <span size="9">'+
'                                        {{ money order.shippingInformation.fees }}'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                            {{ /if }}'+
''+
'                            {{ #has_any order.summary.taxes }}'+
'                            {{ #each order.summary.taxes }}'+
'                            <tr>'+
'                                <td colspan="5" size="9" style="border-bottom: solid 1px #ccc; padding: 5px">'+
'                                    {{ name }}'+
''+
'                                    {{ #if numberForInvoice }}'+
'                                    (<i>{{ numberForInvoice }}</i>)'+
'                                    {{ /if }}'+
'                                </td>'+
'                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px;">'+
'                                    {{ money amount }}'+
'                                </td>'+
'                            </tr>'+
'                            {{ /each }}'+
'                            {{ /has_any}}'+
''+
'                            <tr>'+
'                                <td colspan="5" style="padding: 15px 5px;">'+
'                                    <span size="10">'+
'                                        <strong>'+
'                                            {{ #has_any order.plans }}'+
'                                            Payable now'+
'                                            {{ else }}'+
'                                            Total'+
'                                            {{ /has_any }}'+
'                                        </strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="padding: 15px 5px;">'+
'                                    <span size="10">'+
'                                        {{ #has_any order.plans }}'+
'                                        <strong>'+
'                                            {{ money order.summary.payableNow }}'+
'                                        </strong>'+
'                                        {{ else }}'+
'                                        <strong>'+
'                                            {{ money order.summary.total }}'+
'                                        </strong>'+
'                                        {{ /has_any}}'+
''+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                        </tbody>'+
'                    </table>'+
'                    {{ #has_any order.refunds }}'+
'                    <h3 size="12">'+
'                        Refunds'+
'                    </h3>'+
'                    <table width="100%" cellspacing="0" style="border-collapse: collapse;">'+
'                        <thead>'+
'                            <tr>'+
'                                <td valign="top" style="border-bottom: solid 1px #333; padding: 5px">'+
'                                    <span size="2">'+
'                                        <strong>'+
'                                            Refunded on'+
'                                        </strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" valign="top" style="border-bottom: solid 1px #333; padding: 5px;">'+
'                                    <span size="10">'+
'                                        <strong>'+
'                                            Amount'+
'                                        </strong>'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                        </thead>'+
'                        <tbody>'+
'                            {{ #each order.refunds }}'+
'                            <tr>'+
'                                <td style="border-bottom: solid 1px #ccc; padding: 15px 5px;">'+
'                                    <span size="9">{{ date creationDate }}</span>'+
'                                </td>'+
'                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 15px 5px;">'+
'                                    <span size="9">'+
'                                        {{ money amount }}'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                            {{ /each }}'+
''+
'                            <tr>'+
'                                <td style="padding: 15px 5px;">'+
'                                    <span size="9">'+
'                                        <strong>Adjusted total:</strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="padding: 15px 5px;">'+
'                                    <span size="9">'+
'                                        <strong>{{ money order.summary.adjustedTotal }}</strong>'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                        </tbody>'+
'                    </table>'+
'                    {{ /has_any }}'+
''+
'                    {{ #has_any order.summary.upcomingPayments }}'+
'                    <h3 size="12">Recurring payments schedule</h3>'+
'                    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">'+
'                        <thead>'+
'                            <tr>'+
'                                <td align="left" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">'+
'                                    <span color="#333333" size="10">'+
'                                        <strong>Name</strong>'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px">'+
'                                    <span color="#333333" size="10">'+
'                                        <strong>Next payment</strong>'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                        </thead>'+
'                        <tbody>'+
'                            {{ #each order.summary.upcomingPayments }}'+
'                        <td style="border-bottom: solid 1px #ccc; padding: 10px;">'+
'                            <span size="10">{{ this.name }}</span>'+
'                        </td>'+
'                        <td style="border-bottom: solid 1px #ccc; padding: 10px;" align="right">'+
'                            <span size="10">{{ date this.date \'yyyy-MM-dd HH:mm:ss\' }}</span>'+
'                        </td>'+
'                        {{ /each }}'+
'                        </tbody>'+
'                    </table>'+
'                    {{ /has_any }}'+
''+
'                    <h3 size="12" style="margin-top: 30px">'+
'                        Payment information'+
'                    </h3>'+
'                    <table width="100%" color="#333333" cellspacing="0" style="border-collapse: collapse">'+
'                        <tbody>'+
'                            {{ #if_eq order.paymentMethod \'CreditCard\' }}'+
'                            {{ #if order.card.last4digits }}'+
'                            <tr>'+
'                                <td colspan="3" style="border-bottom: solid 1px #ccc; padding: 15px 5px;">'+
'                                    <span size="10">'+
'                                        Card last 4 digits:'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 15px 5px;">'+
'                                    <span size="10">'+
'                                        <strong>'+
'                                            {{ order.card.last4digits }}'+
'                                        </strong>'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                            {{ /if}}'+
'                            {{ else }}'+
'                            <tr>'+
'                                <td colspan="3" style="border: solid 1px black; padding: 5px;">'+
'                                    <span size="10">'+
'                                        Payment method:'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="border: solid 1px black; padding: 5px;">'+
'                                    <span size="10">'+
'                                        {{ #if_eq order.paymentMethod \'WillBePaidLater\'}}'+
'                                        Deferred'+
'                                        {{ else }}'+
'                                        {{ order.paymentMethod }}'+
'                                        {{ /if_eq}}'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                            {{ /if_eq }}'+
'                            <tr>'+
'                                <td colspan="3" style="padding: 15px 5px;">'+
'                                    <span size="10">'+
'                                        Payment date:'+
'                                    </span>'+
'                                </td>'+
'                                <td align="right" style="padding: 15px 5px;">'+
'                                    <span size="10">'+
'                                        <strong>'+
'                                            {{ date order.completionDate \'yyyy-MM-dd HH:mm:ss\' }}'+
'                                        </strong>'+
'                                    </span>'+
'                                </td>'+
'                            </tr>'+
'                        </tbody>'+
'                    </table>'+
''+
'                    {{ #if settings.signature }}'+
'                    <table width="100%" cellpadding="5" cellspacing="0" style="border: solid 1px #ccc; margin-top: 10px; padding: 5px; page-break-inside: avoid">'+
'                        <tr>'+
'                            <td>'+
'                                <div size="9">'+
'                                    {{{ settings.signature }}}'+
'                                </div>'+
'                            </td>'+
'                        </tr>'+
'                    </table>'+
'                    {{ /if }}'+
''+
'                    {{ #if settings.orderHistoryUrl }}'+
'                    <table width="100%" align="center" cellpadding="5" cellspacing="0" style="margin-top: 10px; padding: 5px;">'+
'                        <tr>'+
'                            <td align="left">'+
'                                <div size="16">'+
'                                    <a href="{{ settings.orderHistoryUrl }}" target="_blank">Click here to consult your orders history</a>'+
'                                </div>'+
'                            </td>'+
'                        </tr>'+
'                    </table>'+
'                    {{ /if }}'+
'                </td>'+
'            </tr>'+
'        </table>'+
'    </center>'+
'</body>';

export const source;
