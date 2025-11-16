/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  mutation Login($email: String!, $password: String!, $rememberMe: Boolean!) {\n    login(username: $email, password: $password, rememberMe: $rememberMe) {\n      __typename\n      ... on CurrentUser {\n        id\n        identifier\n      }\n      ... on InvalidCredentialsError {\n        errorCode\n        message\n      }\n      ... on NativeAuthStrategyError {\n        errorCode\n        message\n      }\n      ... on NotVerifiedError {\n        errorCode\n        message\n      }\n    }\n  }\n": typeof types.LoginDocument;
  "\n  mutation Logout {\n    logout {\n      success\n    }\n  }\n": typeof types.LogoutDocument;
  "\n  mutation RegisterCustomer($input: RegisterCustomerInput!) {\n    registerCustomerAccount(input: $input) {\n      __typename\n      ... on Success {\n        success\n      }\n      ... on NativeAuthStrategyError {\n        errorCode\n        message\n      }\n      ... on PasswordValidationError {\n        errorCode\n        message\n        validationErrorMessage\n      }\n      ... on MissingPasswordError {\n        errorCode\n        message\n      }\n    }\n  }\n": typeof types.RegisterCustomerDocument;
  "\n  query ActiveCustomer {\n    activeCustomer {\n      id\n      firstName\n      lastName\n      emailAddress\n      phoneNumber\n      addresses {\n        id\n        city\n        company\n        country {\n          code\n          name\n        }\n        streetLine1\n        streetLine2\n        postalCode\n        defaultShippingAddress\n        defaultBillingAddress\n      }\n    }\n  }\n": typeof types.ActiveCustomerDocument;
  "\n  fragment ActiveOrderFields on Order {\n    id\n    code\n    state\n    active\n    totalQuantity\n    totalWithTax\n    currencyCode\n    shippingWithTax\n    subTotalWithTax\n    couponCodes\n    lines {\n      id\n      quantity\n      linePriceWithTax\n      discountedLinePriceWithTax\n      unitPriceWithTax\n      productVariant {\n        id\n        name\n        sku\n        priceWithTax\n        currencyCode\n        productId\n        product {\n          slug\n          featuredAsset {\n            id\n            preview\n          }\n        }\n        featuredAsset {\n          id\n          preview\n        }\n      }\n    }\n  }\n": typeof types.ActiveOrderFieldsFragmentDoc;
  "\n  query ActiveOrder {\n    activeOrder {\n      ...ActiveOrderFields\n    }\n  }\n": typeof types.ActiveOrderDocument;
  "\n  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {\n    addItemToOrder(\n      productVariantId: $productVariantId\n      quantity: $quantity\n    ) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n      ... on NegativeQuantityError {\n        errorCode\n        message\n      }\n      ... on InsufficientStockError {\n        errorCode\n        message\n      }\n    }\n  }\n": typeof types.AddItemToOrderDocument;
  "\n  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n      ... on NegativeQuantityError {\n        errorCode\n        message\n      }\n      ... on InsufficientStockError {\n        errorCode\n        message\n      }\n    }\n  }\n": typeof types.AdjustOrderLineDocument;
  "\n  mutation RemoveOrderLine($orderLineId: ID!) {\n    removeOrderLine(orderLineId: $orderLineId) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n    }\n  }\n": typeof types.RemoveOrderLineDocument;
  "\n  mutation SetOrderShippingAddress($input: CreateAddressInput!) {\n    setOrderShippingAddress(input: $input) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n": typeof types.SetOrderShippingAddressDocument;
  "\n  query EligibleShippingMethods {\n    eligibleShippingMethods {\n      id\n      code\n      name\n      description\n      priceWithTax\n    }\n  }\n": typeof types.EligibleShippingMethodsDocument;
  "\n  query EligiblePaymentMethods {\n    eligiblePaymentMethods {\n      id\n      code\n      name\n      description\n      eligibilityMessage\n    }\n  }\n": typeof types.EligiblePaymentMethodsDocument;
  "\n  mutation SetOrderShippingMethod($shippingMethodIds: [ID!]!) {\n    setOrderShippingMethod(shippingMethodId: $shippingMethodIds) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on IneligibleShippingMethodError {\n        errorCode\n        message\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n": typeof types.SetOrderShippingMethodDocument;
  "\n  mutation AddPaymentToOrder($input: PaymentInput!) {\n    addPaymentToOrder(input: $input) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on IneligiblePaymentMethodError {\n        errorCode\n        message\n      }\n      ... on PaymentDeclinedError {\n        errorCode\n        message\n      }\n      ... on PaymentFailedError {\n        errorCode\n        message\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n": typeof types.AddPaymentToOrderDocument;
  "\n  query CollectionsForHome($take: Int = 8) {\n    collections(options: { take: $take, topLevelOnly: true }) {\n      items {\n        id\n        name\n        slug\n        featuredAsset {\n          id\n          preview\n        }\n      }\n    }\n  }\n": typeof types.CollectionsForHomeDocument;
  "\n  query FeaturedProducts($take: Int = 12, $skip: Int = 0) {\n    products(options: { take: $take, skip: $skip, sort: { updatedAt: DESC } }) {\n      items {\n        id\n        name\n        slug\n        description\n        featuredAsset {\n          id\n          preview\n        }\n        variants {\n          id\n          sku\n          priceWithTax\n          currencyCode\n        }\n      }\n      totalItems\n    }\n  }\n": typeof types.FeaturedProductsDocument;
  "\n  query CollectionDetail($slug: String!, $options: ProductVariantListOptions) {\n    collection(slug: $slug) {\n      id\n      name\n      description\n      featuredAsset {\n        id\n        preview\n      }\n      productVariants(options: $options) {\n        totalItems\n        items {\n          id\n          priceWithTax\n          currencyCode\n          name\n          sku\n          product {\n            id\n            slug\n            name\n            description\n            featuredAsset {\n              id\n              preview\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.CollectionDetailDocument;
  "\n  query ProductDetail($slug: String!) {\n    product(slug: $slug) {\n      id\n      name\n      slug\n      description\n      featuredAsset {\n        id\n        preview\n      }\n      assets {\n        id\n        preview\n      }\n      collections {\n        id\n        name\n        slug\n      }\n      variants {\n        id\n        sku\n        name\n        priceWithTax\n        currencyCode\n        stockLevel\n      }\n    }\n  }\n": typeof types.ProductDetailDocument;
  "\n  query OrdersList($options: OrderListOptions) {\n    activeCustomer {\n      id\n      orders(options: $options) {\n        totalItems\n        items {\n          id\n          code\n          state\n          totalQuantity\n          totalWithTax\n          currencyCode\n          createdAt\n        }\n      }\n    }\n  }\n": typeof types.OrdersListDocument;
  "\n  query OrderDetail($id: ID!) {\n    order(id: $id) {\n      id\n      code\n      state\n      totalWithTax\n      totalQuantity\n      currencyCode\n      createdAt\n      updatedAt\n      lines {\n        id\n        quantity\n        unitPriceWithTax\n        linePriceWithTax\n        featuredAsset {\n          id\n          preview\n        }\n        productVariant {\n          id\n          name\n          sku\n          product {\n            slug\n          }\n        }\n      }\n      shippingLines {\n        id\n        priceWithTax\n        shippingMethod {\n          id\n          code\n          name\n        }\n      }\n      customer {\n        id\n        firstName\n        lastName\n        emailAddress\n      }\n      shippingAddress {\n        fullName\n        streetLine1\n        streetLine2\n        city\n        postalCode\n        phoneNumber\n      }\n    }\n  }\n": typeof types.OrderDetailDocument;
  "\n  mutation UpdateCustomer($input: UpdateCustomerInput!) {\n    updateCustomer(input: $input) {\n      id\n      firstName\n      lastName\n      emailAddress\n      phoneNumber\n    }\n  }\n": typeof types.UpdateCustomerDocument;
  "\n  query CustomerAddresses {\n    activeCustomer {\n      id\n      addresses {\n        id\n        fullName\n        streetLine1\n        streetLine2\n        city\n        postalCode\n        phoneNumber\n        country {\n          code\n          name\n        }\n      }\n    }\n  }\n": typeof types.CustomerAddressesDocument;
  "\n  mutation CreateCustomerAddress($input: CreateAddressInput!) {\n    createCustomerAddress(input: $input) {\n      id\n      fullName\n      streetLine1\n      streetLine2\n      city\n      postalCode\n      phoneNumber\n      country {\n        code\n        name\n      }\n    }\n  }\n": typeof types.CreateCustomerAddressDocument;
  "\n  mutation UpdateCustomerAddress($input: UpdateAddressInput!) {\n    updateCustomerAddress(input: $input) {\n      id\n      fullName\n      streetLine1\n      streetLine2\n      city\n      postalCode\n      phoneNumber\n      country {\n        code\n        name\n      }\n    }\n  }\n": typeof types.UpdateCustomerAddressDocument;
  "\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id) {\n      success\n    }\n  }\n": typeof types.DeleteCustomerAddressDocument;
  "\n  query Countries {\n    availableCountries {\n      id\n      code\n      name\n    }\n  }\n": typeof types.CountriesDocument;
};
const documents: Documents = {
  "\n  mutation Login($email: String!, $password: String!, $rememberMe: Boolean!) {\n    login(username: $email, password: $password, rememberMe: $rememberMe) {\n      __typename\n      ... on CurrentUser {\n        id\n        identifier\n      }\n      ... on InvalidCredentialsError {\n        errorCode\n        message\n      }\n      ... on NativeAuthStrategyError {\n        errorCode\n        message\n      }\n      ... on NotVerifiedError {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.LoginDocument,
  "\n  mutation Logout {\n    logout {\n      success\n    }\n  }\n":
    types.LogoutDocument,
  "\n  mutation RegisterCustomer($input: RegisterCustomerInput!) {\n    registerCustomerAccount(input: $input) {\n      __typename\n      ... on Success {\n        success\n      }\n      ... on NativeAuthStrategyError {\n        errorCode\n        message\n      }\n      ... on PasswordValidationError {\n        errorCode\n        message\n        validationErrorMessage\n      }\n      ... on MissingPasswordError {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.RegisterCustomerDocument,
  "\n  query ActiveCustomer {\n    activeCustomer {\n      id\n      firstName\n      lastName\n      emailAddress\n      phoneNumber\n      addresses {\n        id\n        city\n        company\n        country {\n          code\n          name\n        }\n        streetLine1\n        streetLine2\n        postalCode\n        defaultShippingAddress\n        defaultBillingAddress\n      }\n    }\n  }\n":
    types.ActiveCustomerDocument,
  "\n  fragment ActiveOrderFields on Order {\n    id\n    code\n    state\n    active\n    totalQuantity\n    totalWithTax\n    currencyCode\n    shippingWithTax\n    subTotalWithTax\n    couponCodes\n    lines {\n      id\n      quantity\n      linePriceWithTax\n      discountedLinePriceWithTax\n      unitPriceWithTax\n      productVariant {\n        id\n        name\n        sku\n        priceWithTax\n        currencyCode\n        productId\n        product {\n          slug\n          featuredAsset {\n            id\n            preview\n          }\n        }\n        featuredAsset {\n          id\n          preview\n        }\n      }\n    }\n  }\n":
    types.ActiveOrderFieldsFragmentDoc,
  "\n  query ActiveOrder {\n    activeOrder {\n      ...ActiveOrderFields\n    }\n  }\n":
    types.ActiveOrderDocument,
  "\n  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {\n    addItemToOrder(\n      productVariantId: $productVariantId\n      quantity: $quantity\n    ) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n      ... on NegativeQuantityError {\n        errorCode\n        message\n      }\n      ... on InsufficientStockError {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.AddItemToOrderDocument,
  "\n  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n      ... on NegativeQuantityError {\n        errorCode\n        message\n      }\n      ... on InsufficientStockError {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.AdjustOrderLineDocument,
  "\n  mutation RemoveOrderLine($orderLineId: ID!) {\n    removeOrderLine(orderLineId: $orderLineId) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.RemoveOrderLineDocument,
  "\n  mutation SetOrderShippingAddress($input: CreateAddressInput!) {\n    setOrderShippingAddress(input: $input) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.SetOrderShippingAddressDocument,
  "\n  query EligibleShippingMethods {\n    eligibleShippingMethods {\n      id\n      code\n      name\n      description\n      priceWithTax\n    }\n  }\n":
    types.EligibleShippingMethodsDocument,
  "\n  query EligiblePaymentMethods {\n    eligiblePaymentMethods {\n      id\n      code\n      name\n      description\n      eligibilityMessage\n    }\n  }\n":
    types.EligiblePaymentMethodsDocument,
  "\n  mutation SetOrderShippingMethod($shippingMethodIds: [ID!]!) {\n    setOrderShippingMethod(shippingMethodId: $shippingMethodIds) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on IneligibleShippingMethodError {\n        errorCode\n        message\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.SetOrderShippingMethodDocument,
  "\n  mutation AddPaymentToOrder($input: PaymentInput!) {\n    addPaymentToOrder(input: $input) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on IneligiblePaymentMethodError {\n        errorCode\n        message\n      }\n      ... on PaymentDeclinedError {\n        errorCode\n        message\n      }\n      ... on PaymentFailedError {\n        errorCode\n        message\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.AddPaymentToOrderDocument,
  "\n  query CollectionsForHome($take: Int = 8) {\n    collections(options: { take: $take, topLevelOnly: true }) {\n      items {\n        id\n        name\n        slug\n        featuredAsset {\n          id\n          preview\n        }\n      }\n    }\n  }\n":
    types.CollectionsForHomeDocument,
  "\n  query FeaturedProducts($take: Int = 12, $skip: Int = 0) {\n    products(options: { take: $take, skip: $skip, sort: { updatedAt: DESC } }) {\n      items {\n        id\n        name\n        slug\n        description\n        featuredAsset {\n          id\n          preview\n        }\n        variants {\n          id\n          sku\n          priceWithTax\n          currencyCode\n        }\n      }\n      totalItems\n    }\n  }\n":
    types.FeaturedProductsDocument,
  "\n  query CollectionDetail($slug: String!, $options: ProductVariantListOptions) {\n    collection(slug: $slug) {\n      id\n      name\n      description\n      featuredAsset {\n        id\n        preview\n      }\n      productVariants(options: $options) {\n        totalItems\n        items {\n          id\n          priceWithTax\n          currencyCode\n          name\n          sku\n          product {\n            id\n            slug\n            name\n            description\n            featuredAsset {\n              id\n              preview\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.CollectionDetailDocument,
  "\n  query ProductDetail($slug: String!) {\n    product(slug: $slug) {\n      id\n      name\n      slug\n      description\n      featuredAsset {\n        id\n        preview\n      }\n      assets {\n        id\n        preview\n      }\n      collections {\n        id\n        name\n        slug\n      }\n      variants {\n        id\n        sku\n        name\n        priceWithTax\n        currencyCode\n        stockLevel\n      }\n    }\n  }\n":
    types.ProductDetailDocument,
  "\n  query OrdersList($options: OrderListOptions) {\n    activeCustomer {\n      id\n      orders(options: $options) {\n        totalItems\n        items {\n          id\n          code\n          state\n          totalQuantity\n          totalWithTax\n          currencyCode\n          createdAt\n        }\n      }\n    }\n  }\n":
    types.OrdersListDocument,
  "\n  query OrderDetail($id: ID!) {\n    order(id: $id) {\n      id\n      code\n      state\n      totalWithTax\n      totalQuantity\n      currencyCode\n      createdAt\n      updatedAt\n      lines {\n        id\n        quantity\n        unitPriceWithTax\n        linePriceWithTax\n        featuredAsset {\n          id\n          preview\n        }\n        productVariant {\n          id\n          name\n          sku\n          product {\n            slug\n          }\n        }\n      }\n      shippingLines {\n        id\n        priceWithTax\n        shippingMethod {\n          id\n          code\n          name\n        }\n      }\n      customer {\n        id\n        firstName\n        lastName\n        emailAddress\n      }\n      shippingAddress {\n        fullName\n        streetLine1\n        streetLine2\n        city\n        postalCode\n        phoneNumber\n      }\n    }\n  }\n":
    types.OrderDetailDocument,
  "\n  mutation UpdateCustomer($input: UpdateCustomerInput!) {\n    updateCustomer(input: $input) {\n      id\n      firstName\n      lastName\n      emailAddress\n      phoneNumber\n    }\n  }\n":
    types.UpdateCustomerDocument,
  "\n  query CustomerAddresses {\n    activeCustomer {\n      id\n      addresses {\n        id\n        fullName\n        streetLine1\n        streetLine2\n        city\n        postalCode\n        phoneNumber\n        country {\n          code\n          name\n        }\n      }\n    }\n  }\n":
    types.CustomerAddressesDocument,
  "\n  mutation CreateCustomerAddress($input: CreateAddressInput!) {\n    createCustomerAddress(input: $input) {\n      id\n      fullName\n      streetLine1\n      streetLine2\n      city\n      postalCode\n      phoneNumber\n      country {\n        code\n        name\n      }\n    }\n  }\n":
    types.CreateCustomerAddressDocument,
  "\n  mutation UpdateCustomerAddress($input: UpdateAddressInput!) {\n    updateCustomerAddress(input: $input) {\n      id\n      fullName\n      streetLine1\n      streetLine2\n      city\n      postalCode\n      phoneNumber\n      country {\n        code\n        name\n      }\n    }\n  }\n":
    types.UpdateCustomerAddressDocument,
  "\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id) {\n      success\n    }\n  }\n":
    types.DeleteCustomerAddressDocument,
  "\n  query Countries {\n    availableCountries {\n      id\n      code\n      name\n    }\n  }\n":
    types.CountriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Login($email: String!, $password: String!, $rememberMe: Boolean!) {\n    login(username: $email, password: $password, rememberMe: $rememberMe) {\n      __typename\n      ... on CurrentUser {\n        id\n        identifier\n      }\n      ... on InvalidCredentialsError {\n        errorCode\n        message\n      }\n      ... on NativeAuthStrategyError {\n        errorCode\n        message\n      }\n      ... on NotVerifiedError {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation Login($email: String!, $password: String!, $rememberMe: Boolean!) {\n    login(username: $email, password: $password, rememberMe: $rememberMe) {\n      __typename\n      ... on CurrentUser {\n        id\n        identifier\n      }\n      ... on InvalidCredentialsError {\n        errorCode\n        message\n      }\n      ... on NativeAuthStrategyError {\n        errorCode\n        message\n      }\n      ... on NotVerifiedError {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Logout {\n    logout {\n      success\n    }\n  }\n"
): (typeof documents)["\n  mutation Logout {\n    logout {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RegisterCustomer($input: RegisterCustomerInput!) {\n    registerCustomerAccount(input: $input) {\n      __typename\n      ... on Success {\n        success\n      }\n      ... on NativeAuthStrategyError {\n        errorCode\n        message\n      }\n      ... on PasswordValidationError {\n        errorCode\n        message\n        validationErrorMessage\n      }\n      ... on MissingPasswordError {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterCustomer($input: RegisterCustomerInput!) {\n    registerCustomerAccount(input: $input) {\n      __typename\n      ... on Success {\n        success\n      }\n      ... on NativeAuthStrategyError {\n        errorCode\n        message\n      }\n      ... on PasswordValidationError {\n        errorCode\n        message\n        validationErrorMessage\n      }\n      ... on MissingPasswordError {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ActiveCustomer {\n    activeCustomer {\n      id\n      firstName\n      lastName\n      emailAddress\n      phoneNumber\n      addresses {\n        id\n        city\n        company\n        country {\n          code\n          name\n        }\n        streetLine1\n        streetLine2\n        postalCode\n        defaultShippingAddress\n        defaultBillingAddress\n      }\n    }\n  }\n"
): (typeof documents)["\n  query ActiveCustomer {\n    activeCustomer {\n      id\n      firstName\n      lastName\n      emailAddress\n      phoneNumber\n      addresses {\n        id\n        city\n        company\n        country {\n          code\n          name\n        }\n        streetLine1\n        streetLine2\n        postalCode\n        defaultShippingAddress\n        defaultBillingAddress\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ActiveOrderFields on Order {\n    id\n    code\n    state\n    active\n    totalQuantity\n    totalWithTax\n    currencyCode\n    shippingWithTax\n    subTotalWithTax\n    couponCodes\n    lines {\n      id\n      quantity\n      linePriceWithTax\n      discountedLinePriceWithTax\n      unitPriceWithTax\n      productVariant {\n        id\n        name\n        sku\n        priceWithTax\n        currencyCode\n        productId\n        product {\n          slug\n          featuredAsset {\n            id\n            preview\n          }\n        }\n        featuredAsset {\n          id\n          preview\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment ActiveOrderFields on Order {\n    id\n    code\n    state\n    active\n    totalQuantity\n    totalWithTax\n    currencyCode\n    shippingWithTax\n    subTotalWithTax\n    couponCodes\n    lines {\n      id\n      quantity\n      linePriceWithTax\n      discountedLinePriceWithTax\n      unitPriceWithTax\n      productVariant {\n        id\n        name\n        sku\n        priceWithTax\n        currencyCode\n        productId\n        product {\n          slug\n          featuredAsset {\n            id\n            preview\n          }\n        }\n        featuredAsset {\n          id\n          preview\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ActiveOrder {\n    activeOrder {\n      ...ActiveOrderFields\n    }\n  }\n"
): (typeof documents)["\n  query ActiveOrder {\n    activeOrder {\n      ...ActiveOrderFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {\n    addItemToOrder(\n      productVariantId: $productVariantId\n      quantity: $quantity\n    ) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n      ... on NegativeQuantityError {\n        errorCode\n        message\n      }\n      ... on InsufficientStockError {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {\n    addItemToOrder(\n      productVariantId: $productVariantId\n      quantity: $quantity\n    ) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n      ... on NegativeQuantityError {\n        errorCode\n        message\n      }\n      ... on InsufficientStockError {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n      ... on NegativeQuantityError {\n        errorCode\n        message\n      }\n      ... on InsufficientStockError {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {\n    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n      ... on NegativeQuantityError {\n        errorCode\n        message\n      }\n      ... on InsufficientStockError {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveOrderLine($orderLineId: ID!) {\n    removeOrderLine(orderLineId: $orderLineId) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RemoveOrderLine($orderLineId: ID!) {\n    removeOrderLine(orderLineId: $orderLineId) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on OrderModificationError {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetOrderShippingAddress($input: CreateAddressInput!) {\n    setOrderShippingAddress(input: $input) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation SetOrderShippingAddress($input: CreateAddressInput!) {\n    setOrderShippingAddress(input: $input) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query EligibleShippingMethods {\n    eligibleShippingMethods {\n      id\n      code\n      name\n      description\n      priceWithTax\n    }\n  }\n"
): (typeof documents)["\n  query EligibleShippingMethods {\n    eligibleShippingMethods {\n      id\n      code\n      name\n      description\n      priceWithTax\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query EligiblePaymentMethods {\n    eligiblePaymentMethods {\n      id\n      code\n      name\n      description\n      eligibilityMessage\n    }\n  }\n"
): (typeof documents)["\n  query EligiblePaymentMethods {\n    eligiblePaymentMethods {\n      id\n      code\n      name\n      description\n      eligibilityMessage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetOrderShippingMethod($shippingMethodIds: [ID!]!) {\n    setOrderShippingMethod(shippingMethodId: $shippingMethodIds) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on IneligibleShippingMethodError {\n        errorCode\n        message\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation SetOrderShippingMethod($shippingMethodIds: [ID!]!) {\n    setOrderShippingMethod(shippingMethodId: $shippingMethodIds) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on IneligibleShippingMethodError {\n        errorCode\n        message\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddPaymentToOrder($input: PaymentInput!) {\n    addPaymentToOrder(input: $input) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on IneligiblePaymentMethodError {\n        errorCode\n        message\n      }\n      ... on PaymentDeclinedError {\n        errorCode\n        message\n      }\n      ... on PaymentFailedError {\n        errorCode\n        message\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddPaymentToOrder($input: PaymentInput!) {\n    addPaymentToOrder(input: $input) {\n      __typename\n      ... on Order {\n        ...ActiveOrderFields\n      }\n      ... on IneligiblePaymentMethodError {\n        errorCode\n        message\n      }\n      ... on PaymentDeclinedError {\n        errorCode\n        message\n      }\n      ... on PaymentFailedError {\n        errorCode\n        message\n      }\n      ... on NoActiveOrderError {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CollectionsForHome($take: Int = 8) {\n    collections(options: { take: $take, topLevelOnly: true }) {\n      items {\n        id\n        name\n        slug\n        featuredAsset {\n          id\n          preview\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CollectionsForHome($take: Int = 8) {\n    collections(options: { take: $take, topLevelOnly: true }) {\n      items {\n        id\n        name\n        slug\n        featuredAsset {\n          id\n          preview\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query FeaturedProducts($take: Int = 12, $skip: Int = 0) {\n    products(options: { take: $take, skip: $skip, sort: { updatedAt: DESC } }) {\n      items {\n        id\n        name\n        slug\n        description\n        featuredAsset {\n          id\n          preview\n        }\n        variants {\n          id\n          sku\n          priceWithTax\n          currencyCode\n        }\n      }\n      totalItems\n    }\n  }\n"
): (typeof documents)["\n  query FeaturedProducts($take: Int = 12, $skip: Int = 0) {\n    products(options: { take: $take, skip: $skip, sort: { updatedAt: DESC } }) {\n      items {\n        id\n        name\n        slug\n        description\n        featuredAsset {\n          id\n          preview\n        }\n        variants {\n          id\n          sku\n          priceWithTax\n          currencyCode\n        }\n      }\n      totalItems\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CollectionDetail($slug: String!, $options: ProductVariantListOptions) {\n    collection(slug: $slug) {\n      id\n      name\n      description\n      featuredAsset {\n        id\n        preview\n      }\n      productVariants(options: $options) {\n        totalItems\n        items {\n          id\n          priceWithTax\n          currencyCode\n          name\n          sku\n          product {\n            id\n            slug\n            name\n            description\n            featuredAsset {\n              id\n              preview\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CollectionDetail($slug: String!, $options: ProductVariantListOptions) {\n    collection(slug: $slug) {\n      id\n      name\n      description\n      featuredAsset {\n        id\n        preview\n      }\n      productVariants(options: $options) {\n        totalItems\n        items {\n          id\n          priceWithTax\n          currencyCode\n          name\n          sku\n          product {\n            id\n            slug\n            name\n            description\n            featuredAsset {\n              id\n              preview\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ProductDetail($slug: String!) {\n    product(slug: $slug) {\n      id\n      name\n      slug\n      description\n      featuredAsset {\n        id\n        preview\n      }\n      assets {\n        id\n        preview\n      }\n      collections {\n        id\n        name\n        slug\n      }\n      variants {\n        id\n        sku\n        name\n        priceWithTax\n        currencyCode\n        stockLevel\n      }\n    }\n  }\n"
): (typeof documents)["\n  query ProductDetail($slug: String!) {\n    product(slug: $slug) {\n      id\n      name\n      slug\n      description\n      featuredAsset {\n        id\n        preview\n      }\n      assets {\n        id\n        preview\n      }\n      collections {\n        id\n        name\n        slug\n      }\n      variants {\n        id\n        sku\n        name\n        priceWithTax\n        currencyCode\n        stockLevel\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query OrdersList($options: OrderListOptions) {\n    activeCustomer {\n      id\n      orders(options: $options) {\n        totalItems\n        items {\n          id\n          code\n          state\n          totalQuantity\n          totalWithTax\n          currencyCode\n          createdAt\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query OrdersList($options: OrderListOptions) {\n    activeCustomer {\n      id\n      orders(options: $options) {\n        totalItems\n        items {\n          id\n          code\n          state\n          totalQuantity\n          totalWithTax\n          currencyCode\n          createdAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query OrderDetail($id: ID!) {\n    order(id: $id) {\n      id\n      code\n      state\n      totalWithTax\n      totalQuantity\n      currencyCode\n      createdAt\n      updatedAt\n      lines {\n        id\n        quantity\n        unitPriceWithTax\n        linePriceWithTax\n        featuredAsset {\n          id\n          preview\n        }\n        productVariant {\n          id\n          name\n          sku\n          product {\n            slug\n          }\n        }\n      }\n      shippingLines {\n        id\n        priceWithTax\n        shippingMethod {\n          id\n          code\n          name\n        }\n      }\n      customer {\n        id\n        firstName\n        lastName\n        emailAddress\n      }\n      shippingAddress {\n        fullName\n        streetLine1\n        streetLine2\n        city\n        postalCode\n        phoneNumber\n      }\n    }\n  }\n"
): (typeof documents)["\n  query OrderDetail($id: ID!) {\n    order(id: $id) {\n      id\n      code\n      state\n      totalWithTax\n      totalQuantity\n      currencyCode\n      createdAt\n      updatedAt\n      lines {\n        id\n        quantity\n        unitPriceWithTax\n        linePriceWithTax\n        featuredAsset {\n          id\n          preview\n        }\n        productVariant {\n          id\n          name\n          sku\n          product {\n            slug\n          }\n        }\n      }\n      shippingLines {\n        id\n        priceWithTax\n        shippingMethod {\n          id\n          code\n          name\n        }\n      }\n      customer {\n        id\n        firstName\n        lastName\n        emailAddress\n      }\n      shippingAddress {\n        fullName\n        streetLine1\n        streetLine2\n        city\n        postalCode\n        phoneNumber\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateCustomer($input: UpdateCustomerInput!) {\n    updateCustomer(input: $input) {\n      id\n      firstName\n      lastName\n      emailAddress\n      phoneNumber\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateCustomer($input: UpdateCustomerInput!) {\n    updateCustomer(input: $input) {\n      id\n      firstName\n      lastName\n      emailAddress\n      phoneNumber\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CustomerAddresses {\n    activeCustomer {\n      id\n      addresses {\n        id\n        fullName\n        streetLine1\n        streetLine2\n        city\n        postalCode\n        phoneNumber\n        country {\n          code\n          name\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CustomerAddresses {\n    activeCustomer {\n      id\n      addresses {\n        id\n        fullName\n        streetLine1\n        streetLine2\n        city\n        postalCode\n        phoneNumber\n        country {\n          code\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateCustomerAddress($input: CreateAddressInput!) {\n    createCustomerAddress(input: $input) {\n      id\n      fullName\n      streetLine1\n      streetLine2\n      city\n      postalCode\n      phoneNumber\n      country {\n        code\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateCustomerAddress($input: CreateAddressInput!) {\n    createCustomerAddress(input: $input) {\n      id\n      fullName\n      streetLine1\n      streetLine2\n      city\n      postalCode\n      phoneNumber\n      country {\n        code\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateCustomerAddress($input: UpdateAddressInput!) {\n    updateCustomerAddress(input: $input) {\n      id\n      fullName\n      streetLine1\n      streetLine2\n      city\n      postalCode\n      phoneNumber\n      country {\n        code\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateCustomerAddress($input: UpdateAddressInput!) {\n    updateCustomerAddress(input: $input) {\n      id\n      fullName\n      streetLine1\n      streetLine2\n      city\n      postalCode\n      phoneNumber\n      country {\n        code\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id) {\n      success\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Countries {\n    availableCountries {\n      id\n      code\n      name\n    }\n  }\n"
): (typeof documents)["\n  query Countries {\n    availableCountries {\n      id\n      code\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
