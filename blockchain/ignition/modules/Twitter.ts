import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TwitterModule = buildModule("TwitterModule", (m) => {
  const Twitter = m.contract("Twitter");

  return { Twitter };
});

export default TwitterModule;
