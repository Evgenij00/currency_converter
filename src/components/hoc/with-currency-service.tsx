import React from "react";
import { ICurrencyService } from "../../services/currency-service";
import { CurrencyServiceConsumer } from "../currency-service-context";

const withCurrencyService = () => (Wrapped: any) => {
  return (props: any) => {
    return (
      <CurrencyServiceConsumer>
        {(service: ICurrencyService) => {
          return <Wrapped {...props} service={service} />;
        }}
      </CurrencyServiceConsumer>
    );
  };
};

export default withCurrencyService;
