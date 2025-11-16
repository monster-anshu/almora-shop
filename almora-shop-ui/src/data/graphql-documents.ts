import { graphql } from "~/gql";

export const LoginDocument = graphql(/* GraphQL */ `
  mutation Login($email: String!, $password: String!, $rememberMe: Boolean!) {
    login(username: $email, password: $password, rememberMe: $rememberMe) {
      __typename
      ... on CurrentUser {
        id
        identifier
      }
      ... on InvalidCredentialsError {
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
      ... on NotVerifiedError {
        errorCode
        message
      }
    }
  }
`);

export const LogoutDocument = graphql(/* GraphQL */ `
  mutation Logout {
    logout {
      success
    }
  }
`);

export const RegisterCustomerDocument = graphql(/* GraphQL */ `
  mutation RegisterCustomer($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      __typename
      ... on Success {
        success
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
      ... on PasswordValidationError {
        errorCode
        message
        validationErrorMessage
      }
      ... on MissingPasswordError {
        errorCode
        message
      }
    }
  }
`);

export const ActiveCustomerDocument = graphql(/* GraphQL */ `
  query ActiveCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      addresses {
        id
        city
        company
        country {
          code
          name
        }
        streetLine1
        streetLine2
        postalCode
        defaultShippingAddress
        defaultBillingAddress
      }
    }
  }
`);

export const ActiveOrderFragment = graphql(/* GraphQL */ `
  fragment ActiveOrderFields on Order {
    id
    code
    state
    active
    totalQuantity
    totalWithTax
    currencyCode
    shippingWithTax
    subTotalWithTax
    couponCodes
    lines {
      id
      quantity
      linePriceWithTax
      discountedLinePriceWithTax
      unitPriceWithTax
      productVariant {
        id
        name
        sku
        priceWithTax
        currencyCode
        productId
        product {
          slug
          featuredAsset {
            id
            preview
          }
        }
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`);

export const ActiveOrderDocument = graphql(/* GraphQL */ `
  query ActiveOrder {
    activeOrder {
      ...ActiveOrderFields
    }
  }
`);

export const AddItemToOrderDocument = graphql(/* GraphQL */ `
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      __typename
      ... on Order {
        ...ActiveOrderFields
      }
      ... on OrderModificationError {
        errorCode
        message
      }
      ... on NegativeQuantityError {
        errorCode
        message
      }
      ... on InsufficientStockError {
        errorCode
        message
      }
    }
  }
`);

export const AdjustOrderLineDocument = graphql(/* GraphQL */ `
  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      __typename
      ... on Order {
        ...ActiveOrderFields
      }
      ... on OrderModificationError {
        errorCode
        message
      }
      ... on NegativeQuantityError {
        errorCode
        message
      }
      ... on InsufficientStockError {
        errorCode
        message
      }
    }
  }
`);

export const RemoveOrderLineDocument = graphql(/* GraphQL */ `
  mutation RemoveOrderLine($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      __typename
      ... on Order {
        ...ActiveOrderFields
      }
      ... on OrderModificationError {
        errorCode
        message
      }
    }
  }
`);

export const SetOrderShippingAddressDocument = graphql(/* GraphQL */ `
  mutation SetOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      __typename
      ... on Order {
        ...ActiveOrderFields
      }
      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`);

export const EligibleShippingMethodsDocument = graphql(/* GraphQL */ `
  query EligibleShippingMethods {
    eligibleShippingMethods {
      id
      code
      name
      description
      priceWithTax
    }
  }
`);

export const EligiblePaymentMethodsDocument = graphql(/* GraphQL */ `
  query EligiblePaymentMethods {
    eligiblePaymentMethods {
      id
      code
      name
      description
      eligibilityMessage
    }
  }
`);

export const SetOrderShippingMethodDocument = graphql(/* GraphQL */ `
  mutation SetOrderShippingMethod($shippingMethodIds: [ID!]!) {
    setOrderShippingMethod(shippingMethodId: $shippingMethodIds) {
      __typename
      ... on Order {
        ...ActiveOrderFields
      }
      ... on IneligibleShippingMethodError {
        errorCode
        message
      }
      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`);

export const AddPaymentToOrderDocument = graphql(/* GraphQL */ `
  mutation AddPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      __typename
      ... on Order {
        ...ActiveOrderFields
      }
      ... on IneligiblePaymentMethodError {
        errorCode
        message
      }
      ... on PaymentDeclinedError {
        errorCode
        message
      }
      ... on PaymentFailedError {
        errorCode
        message
      }
      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`);

export const CollectionsForHomeDocument = graphql(/* GraphQL */ `
  query CollectionsForHome($take: Int = 8) {
    collections(options: { take: $take, topLevelOnly: true }) {
      items {
        id
        name
        slug
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`);

export const FeaturedProductsDocument = graphql(/* GraphQL */ `
  query FeaturedProducts($take: Int = 12, $skip: Int = 0) {
    products(options: { take: $take, skip: $skip, sort: { updatedAt: DESC } }) {
      items {
        id
        name
        slug
        description
        featuredAsset {
          id
          preview
        }
        variants {
          id
          sku
          priceWithTax
          currencyCode
        }
      }
      totalItems
    }
  }
`);

export const CollectionDetailDocument = graphql(/* GraphQL */ `
  query CollectionDetail($slug: String!, $options: ProductVariantListOptions) {
    collection(slug: $slug) {
      id
      name
      description
      featuredAsset {
        id
        preview
      }
      productVariants(options: $options) {
        totalItems
        items {
          id
          priceWithTax
          currencyCode
          name
          sku
          product {
            id
            slug
            name
            description
            featuredAsset {
              id
              preview
            }
          }
        }
      }
    }
  }
`);

export const ProductDetailDocument = graphql(/* GraphQL */ `
  query ProductDetail($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      featuredAsset {
        id
        preview
      }
      assets {
        id
        preview
      }
      collections {
        id
        name
        slug
      }
      variants {
        id
        sku
        name
        priceWithTax
        currencyCode
        stockLevel
      }
    }
  }
`);

export const OrdersListDocument = graphql(/* GraphQL */ `
  query OrdersList($options: OrderListOptions) {
    activeCustomer {
      id
      orders(options: $options) {
        totalItems
        items {
          id
          code
          state
          totalQuantity
          totalWithTax
          currencyCode
          createdAt
        }
      }
    }
  }
`);

export const OrderDetailDocument = graphql(/* GraphQL */ `
  query OrderDetail($id: ID!) {
    order(id: $id) {
      id
      code
      state
      totalWithTax
      totalQuantity
      currencyCode
      createdAt
      updatedAt
      lines {
        id
        quantity
        unitPriceWithTax
        linePriceWithTax
        featuredAsset {
          id
          preview
        }
        productVariant {
          id
          name
          sku
          product {
            slug
          }
        }
      }
      shippingLines {
        id
        priceWithTax
        shippingMethod {
          id
          code
          name
        }
      }
      customer {
        id
        firstName
        lastName
        emailAddress
      }
      shippingAddress {
        fullName
        streetLine1
        streetLine2
        city
        postalCode
        phoneNumber
      }
    }
  }
`);

export const UpdateCustomerDocument = graphql(/* GraphQL */ `
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`);

export const CustomerAddressesDocument = graphql(/* GraphQL */ `
  query CustomerAddresses {
    activeCustomer {
      id
      addresses {
        id
        fullName
        streetLine1
        streetLine2
        city
        postalCode
        phoneNumber
        country {
          code
          name
        }
      }
    }
  }
`);

export const CreateCustomerAddressDocument = graphql(/* GraphQL */ `
  mutation CreateCustomerAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      id
      fullName
      streetLine1
      streetLine2
      city
      postalCode
      phoneNumber
      country {
        code
        name
      }
    }
  }
`);

export const UpdateCustomerAddressDocument = graphql(/* GraphQL */ `
  mutation UpdateCustomerAddress($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      id
      fullName
      streetLine1
      streetLine2
      city
      postalCode
      phoneNumber
      country {
        code
        name
      }
    }
  }
`);

export const DeleteCustomerAddressDocument = graphql(/* GraphQL */ `
  mutation DeleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      success
    }
  }
`);

export const CountriesDocument = graphql(/* GraphQL */ `
  query Countries {
    availableCountries {
      id
      code
      name
    }
  }
`);
