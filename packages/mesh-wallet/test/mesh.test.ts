import { MeshWallet } from "@meshsdk/wallet";

describe("MeshWallet", () => {
  const wallet = new MeshWallet({
    networkId: 0,
    key: {
      type: "mnemonic",
      words: "solution,".repeat(24).split(",").slice(0, 24),
    },
  });

  beforeAll(async () => {
    await wallet.init();
  });

  it("private keys", async () => {
    const _wallet = new MeshWallet({
      networkId: 0,
      key: {
        type: "root",
        bech32:
          "xprv1cqa46gk29plgkg98upclnjv5t425fcpl4rgf9mq2txdxuga7jfq5shk7np6l55nj00sl3m4syzna3uwgrwppdm0azgy9d8zahyf32s62klfyhe0ayyxkc7x92nv4s77fa0v25tufk9tnv7x6dgexe9kdz5gpeqgu",
      },
    });
    await _wallet.init();
    expect(await _wallet.getChangeAddress()).toEqual(
      "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9",
    );
  });

  it("cli keys", async () => {
    const _wallet = new MeshWallet({
      networkId: 0,
      key: {
        type: "cli",
        payment:
          "5820f083e5878c6f980c53d30b9cc2baadd780307b08acec9e0792892e013bbe9241",
        stake:
          "5820b810d6398db44f380a9ab279f63950c4b95432f44fafb5a6f026afe23bbe9241",
      },
    });
    await _wallet.init();
    expect(await _wallet.getChangeAddress()).toEqual(
      "addr_test1qqdy60gf798xrl20wwvapvsxj3kr8yz8ac6zfmgwg6c5g9p3x07mt562mneg8jxgj03p2uvmhyfyvktjn259mws8e6wq3cdn8p",
    );
    expect((await _wallet.getRewardAddresses())[0]).toEqual(
      "stake_test1uqcn8ld46d9deu5reryf8cs4wxdmjyjxt9ef42zahgrua8qctnd74",
    );
  });

  it("init with address", async () => {
    const _wallet = new MeshWallet({
      networkId: 0,
      key: {
        type: "address",
        address:
          "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9",
      },
    });
    await _wallet.init();
    expect(_wallet.addresses.baseAddressBech32).toEqual(
      "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9",
    );
    expect(_wallet.addresses.enterpriseAddressBech32).toEqual(
      "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
    );
    expect(_wallet.addresses.rewardAddressBech32).toEqual(
      "stake_test1uzw5mnt7g4xjgdqkfa80hrk7kdvds6sa4k0vvgjvlj7w8eskffj2n",
    );
  });

  it("getChangeAddress", async () => {
    const changeAddress = await wallet.getChangeAddress();
    expect(changeAddress).toEqual(
      "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9",
    );
  });

  it("getNetworkId", async () => {
    const networkId = await wallet.getNetworkId();
    expect(networkId).toEqual(0);
  });

  it("getRewardAddresses", async () => {
    const addresses = await wallet.getRewardAddresses();
    expect(addresses).toEqual([
      "stake_test1uzw5mnt7g4xjgdqkfa80hrk7kdvds6sa4k0vvgjvlj7w8eskffj2n",
    ]);
  });

  it("getUnusedAddresses", async () => {
    const addresses = await wallet.getUnusedAddresses();
    expect(addresses).toEqual([
      "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9",
    ]);
  });

  it("getUsedAddresses", async () => {
    const addresses = await wallet.getUsedAddresses();
    expect(addresses).toEqual([
      "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9",
    ]);
  });

  it("getUsedAddress", async () => {
    const address = wallet.getUsedAddress();
    expect(address.toBech32()).toEqual(
      "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9",
    );
  });
});

describe("MeshWallet cli key", () => {
  const wallet = new MeshWallet({
    networkId: 0,
    key: {
      type: "cli",
      payment:
        "58201aae63d93899640e91b51c5e8bd542262df3ecf3246c3854f39c40f4eb83557d",
    },
  });

  beforeAll(async () => {
    await wallet.init();
  });

  it("getChangeAddress", async () => {
    const changeAddress = await wallet.getChangeAddress();
    expect(changeAddress).toEqual(
      "addr_test1qpsthwvxgfkkm2lm8ggy0c5345u6vrfctmug6tdyx4rf4m9g500utfac3r6wvsygpnvt57a5ht0edjs0n6ejlwvuytns23durk",
    );
  });
});
