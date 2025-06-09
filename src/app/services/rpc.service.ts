import { Injectable } from '@angular/core';
import * as Kaspa from '../web/kaspa/kaspa.js';
import { getSettingFromStorageOrQueryParam } from '../constants/network-utils.js';
const { RpcClient } = Kaspa;

@Injectable({
  providedIn: 'root',
})
export class RpcService {
  private _rpc: Kaspa.RpcClient | undefined;
  private _selectedNetwork: string = getSettingFromStorageOrQueryParam('selectedNetwork') || 'mainnet';
  private _currentNodeUrl: string | undefined;
  private _resolver: Kaspa.Resolver | undefined;

  constructor() {}

  public get selectedNetwork() {
    return this._selectedNetwork;
  }

  public get currentNodeUrl() {
    return this._currentNodeUrl;
  }

  public set selectedNetwork(network: string) {
    this._selectedNetwork = network;

    localStorage.setItem('selectedNetwork', network);
    location.reload();
  }

  public get rpc() {
    return this._rpc;
  }

  async connect(userUrl: string | undefined) {
    let url: string | undefined = userUrl;

    if (!userUrl) {
      console.log('Resolving URL...');
      this._resolver = new Kaspa.Resolver();
      const urlResult = await this._resolver.getUrl(Kaspa.Encoding.Borsh, this._selectedNetwork);
      userUrl = urlResult;
      console.log('Resolved URL:', urlResult);
      url = urlResult;
    } else {
      console.log('Using user provided URL:', userUrl);
    }
    console.log(`Connecting to Kaspa network...`, userUrl);

    this._currentNodeUrl = userUrl;
    this._rpc = new RpcClient({
      url,
      networkId: this._selectedNetwork,
    });

    await this._rpc.connect({
      strategy: Kaspa.ConnectStrategy.Fallback,
    });
    console.log('Connected to', this._rpc.url);
  }

  async disconnect() {
    if (this._rpc) {
      await this._rpc.disconnect();
    }
  }
}
