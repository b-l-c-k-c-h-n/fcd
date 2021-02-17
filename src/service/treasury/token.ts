import * as rp from 'request-promise'
import { getContractStore } from 'lib/lcd'
import { div } from 'lib/math'

const ASSETS_BY_ADDRESS = {
  terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6: {
    symbol: 'MIR',
    name: 'Mirror',
    token: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
    pair: 'terra1amv303y8kzxuegvurh0gug2xe9wkgj65enq2ux',
    lpToken: 'terra17gjf2zehfvnyjtdgua9p9ygquk6gukxe7ucgwh',
    status: 'LISTED'
  },
  terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz: {
    symbol: 'mAAPL',
    name: 'Apple Inc.',
    token: 'terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz',
    pair: 'terra1774f8rwx76k7ruy0gqnzq25wh7lmd72eg6eqp5',
    lpToken: 'terra122asauhmv083p02rhgyp7jn7kmjjm4ksexjnks',
    status: 'LISTED'
  },
  terra1g4x2pzmkc9z3mseewxf758rllg08z3797xly0n: {
    symbol: 'mABNB',
    name: 'Airbnb Inc.',
    token: 'terra1g4x2pzmkc9z3mseewxf758rllg08z3797xly0n',
    pair: 'terra1gq7lq389w4dxqtkxj03wp0fvz0cemj0ek5wwmm',
    lpToken: 'terra1jmauv302lfvpdfau5nhzy06q0j2f9te4hy2d07',
    status: 'LISTED'
  },
  terra1qelfthdanju7wavc5tq0k5r0rhsyzyyrsn09qy: {
    symbol: 'mAMC',
    name: 'AMC Entertainment Holdings Inc.',
    token: 'terra1qelfthdanju7wavc5tq0k5r0rhsyzyyrsn09qy',
    pair: 'terra1uenpalqlmfaf4efgtqsvzpa3gh898d9h2a232g',
    lpToken: 'terra1mtvslkm2tgsmh908dsfksnqu7r7lulh24a6knv',
    status: 'LISTED'
  },
  terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2: {
    symbol: 'mAMZN',
    name: 'Amazon.com, Inc.',
    token: 'terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2',
    pair: 'terra1vkvmvnmex90wanque26mjvay2mdtf0rz57fm6d',
    lpToken: 'terra1q7m2qsj3nzlz5ng25z5q5w5qcqldclfe3ljup9',
    status: 'LISTED'
  },
  terra1w7zgkcyt7y4zpct9dw8mw362ywvdlydnum2awa: {
    symbol: 'mBABA',
    name: 'Alibaba Group Holding Limited',
    token: 'terra1w7zgkcyt7y4zpct9dw8mw362ywvdlydnum2awa',
    pair: 'terra1afdz4l9vsqddwmjqxmel99atu4rwscpfjm4yfp',
    lpToken: 'terra1stfeev27wdf7er2uja34gsmrv58yv397dlxmyn',
    status: 'LISTED'
  },
  terra1rhhvx8nzfrx5fufkuft06q5marfkucdqwq5sjw: {
    symbol: 'mBTC',
    name: 'Bitcoin',
    token: 'terra1rhhvx8nzfrx5fufkuft06q5marfkucdqwq5sjw',
    pair: 'terra1prfcyujt9nsn5kfj5n925sfd737r2n8tk5lmpv',
    lpToken: 'terra1d34edutzwcz6jgecgk26mpyynqh74j3emdsnq5',
    status: 'LISTED'
  },
  terra1dk3g53js3034x4v5c3vavhj2738une880yu6kx: {
    symbol: 'mETH',
    name: 'Ether',
    token: 'terra1dk3g53js3034x4v5c3vavhj2738une880yu6kx',
    pair: 'terra14fyt2g3umeatsr4j4g2rs8ca0jceu3k0mcs7ry',
    lpToken: 'terra16auz7uhnuxrj2dzrynz2elthx5zpps5gs6tyln',
    status: 'LISTED'
  },
  terra1mqsjugsugfprn3cvgxsrr8akkvdxv2pzc74us7: {
    symbol: 'mFB',
    name: 'Facebook Inc.',
    token: 'terra1mqsjugsugfprn3cvgxsrr8akkvdxv2pzc74us7',
    pair: 'terra1yl2atgxw422qxahm02p364wtgu7gmeya237pcs',
    lpToken: 'terra1jh2dh4g65hptsrwjv53nhsnkwlw8jdrxaxrca0',
    status: 'LISTED'
  },
  terra1m6j6j9gw728n82k78s0j9kq8l5p6ne0xcc820p: {
    symbol: 'mGME',
    name: 'GameStop Corp',
    token: 'terra1m6j6j9gw728n82k78s0j9kq8l5p6ne0xcc820p',
    pair: 'terra17eakdtane6d2y7y6v0s79drq7gnhzqan48kxw7',
    lpToken: 'terra1azk43zydh3sdxelg3h4csv4a4uef7fmjy0hu20',
    status: 'LISTED'
  },
  terra1h8arz2k547uvmpxctuwush3jzc8fun4s96qgwt: {
    symbol: 'mGOOGL',
    name: 'Alphabet Inc.',
    token: 'terra1h8arz2k547uvmpxctuwush3jzc8fun4s96qgwt',
    pair: 'terra1u56eamzkwzpm696hae4kl92jm6xxztar9uhkea',
    lpToken: 'terra1falkl6jy4087h4z567y2l59defm9acmwcs70ts',
    status: 'LISTED'
  },
  terra137drsu8gce5thf6jr5mxlfghw36rpljt3zj73v: {
    symbol: 'mGS',
    name: 'Goldman Sachs Group Inc.',
    token: 'terra137drsu8gce5thf6jr5mxlfghw36rpljt3zj73v',
    pair: 'terra108ukjf6ekezuc52t9keernlqxtmzpj4wf7rx0h',
    lpToken: 'terra17smg3rl9vdpawwpe7ex4ea4xm6q038gp2chge5',
    status: 'LISTED'
  },
  terra15hp9pr8y4qsvqvxf3m4xeptlk7l8h60634gqec: {
    symbol: 'mIAU',
    name: 'iShares Gold Trust',
    token: 'terra15hp9pr8y4qsvqvxf3m4xeptlk7l8h60634gqec',
    pair: 'terra1q2cg4sauyedt8syvarc8hcajw6u94ah40yp342',
    lpToken: 'terra1jl4vkz3fllvj6fchnj2trrm9argtqxq6335ews',
    status: 'LISTED'
  },
  terra1227ppwxxj3jxz8cfgq00jgnxqcny7ryenvkwj6: {
    symbol: 'mMSFT',
    name: 'Microsoft Corporation',
    token: 'terra1227ppwxxj3jxz8cfgq00jgnxqcny7ryenvkwj6',
    pair: 'terra10ypv4vq67ns54t5ur3krkx37th7j58paev0qhd',
    lpToken: 'terra14uaqudeylx6tegamqmygh85lfq8qg2jmg7uucc',
    status: 'LISTED'
  },
  terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k: {
    symbol: 'mNFLX',
    name: 'Netflix, Inc.',
    token: 'terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k',
    pair: 'terra1yppvuda72pvmxd727knemvzsuergtslj486rdq',
    lpToken: 'terra1mwu3cqzvhygqg7vrsa6kfstgg9d6yzkgs6yy3t',
    status: 'LISTED'
  },
  terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp: {
    symbol: 'mQQQ',
    name: 'Invesco QQQ Trust',
    token: 'terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp',
    pair: 'terra1dkc8075nv34k2fu6xn6wcgrqlewup2qtkr4ymu',
    lpToken: 'terra16j09nh806vaql0wujw8ktmvdj7ph8h09ltjs2r',
    status: 'LISTED'
  },
  terra1kscs6uhrqwy6rx5kuw5lwpuqvm3t6j2d6uf2lp: {
    symbol: 'mSLV',
    name: 'iShares Silver Trust',
    token: 'terra1kscs6uhrqwy6rx5kuw5lwpuqvm3t6j2d6uf2lp',
    pair: 'terra1f6d9mhrsl5t6yxqnr4rgfusjlt3gfwxdveeyuy',
    lpToken: 'terra178cf7xf4r9d3z03tj3pftewmhx0x2p77s0k6yh',
    status: 'LISTED'
  },
  terra14y5affaarufk3uscy2vr6pe6w6zqf2wpjzn5sh: {
    symbol: 'mTSLA',
    name: 'Tesla, Inc.',
    token: 'terra14y5affaarufk3uscy2vr6pe6w6zqf2wpjzn5sh',
    pair: 'terra1pdxyk2gkykaraynmrgjfq2uu7r9pf5v8x7k4xk',
    lpToken: 'terra1ygazp9w7tx64rkx5wmevszu38y5cpg6h3fk86e',
    status: 'LISTED'
  },
  terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg: {
    symbol: 'mTWTR',
    name: 'Twitter, Inc.',
    token: 'terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg',
    pair: 'terra1ea9js3y4l7vy0h46k4e5r5ykkk08zc3fx7v4t8',
    lpToken: 'terra1fc5a5gsxatjey9syq93c2n3xq90n06t60nkj6l',
    status: 'LISTED'
  },
  terra1lvmx8fsagy70tv0fhmfzdw9h6s3sy4prz38ugf: {
    symbol: 'mUSO',
    name: 'United States Oil Fund, LP',
    token: 'terra1lvmx8fsagy70tv0fhmfzdw9h6s3sy4prz38ugf',
    pair: 'terra1zey9knmvs2frfrjnf4cfv4prc4ts3mrsefstrj',
    lpToken: 'terra1utf3tm35qk6fkft7ltcnscwml737vfz7xghwn5',
    status: 'LISTED'
  },
  terra1zp3a6q6q4953cz376906g5qfmxnlg77hx3te45: {
    symbol: 'mVIXY',
    name: 'ProShares VIX Short-Term Futures ETF',
    token: 'terra1zp3a6q6q4953cz376906g5qfmxnlg77hx3te45',
    pair: 'terra1yngadscckdtd68nzw5r5va36jccjmmasm7klpp',
    lpToken: 'terra1cmrl4txa7cwd7cygpp4yzu7xu8g7c772els2y8',
    status: 'LISTED'
  }
}

const ASSETS_BY_SYMBOL: {
  [symbol: string]: {
    symbol: string
    name: string
    token: string
    pair: string
    lpToken: string
    status: string
  }
} = Object.keys(ASSETS_BY_ADDRESS).reduce((prev, curr) => {
  prev[ASSETS_BY_ADDRESS[curr].symbol.toLowerCase()] = ASSETS_BY_ADDRESS[curr]
  return prev
}, {})

export const TOKEN_SYMBOLS = Object.keys(ASSETS_BY_ADDRESS).map((address) =>
  ASSETS_BY_ADDRESS[address].symbol.toLowerCase()
)

export const isToken = (symbol: string) => TOKEN_SYMBOLS.includes(symbol.toLowerCase())

async function getMirSupply(): Promise<{ totalSupply: string; circulatingSupply: string }> {
  const res = await rp('https://graph.mirror.finance/graphql', {
    method: 'POST',
    rejectUnauthorized: false,
    body: {
      operationName: 'statistic',
      query: `query statistic {
          statistic {
            mirTotalSupply
            mirCirculatingSupply
          }
        }`,
      variables: {}
    },
    json: true
  })

  if (!res?.data?.statistic) {
    return {
      totalSupply: '',
      circulatingSupply: ''
    }
  }

  return {
    totalSupply: div(res.data.statistic.mirTotalSupply, 1000000),
    circulatingSupply: div(res.data.statistic.mirCirculatingSupply, 1000000)
  }
}

export async function getCirculatingSupply(symbol: string): Promise<string> {
  if (symbol.toLowerCase() === 'mir') {
    return (await getMirSupply()).circulatingSupply
  }

  return getTotalSupply(symbol)
}

export async function getTotalSupply(symbol: string): Promise<string> {
  const lowerCasedSymbol = symbol.toLowerCase()

  if (lowerCasedSymbol === 'mir') {
    return (await getMirSupply()).totalSupply
  }

  const asset = ASSETS_BY_SYMBOL[lowerCasedSymbol]

  if (!asset) {
    return ''
  }

  const res = await getContractStore(asset.token, { token_info: {} })

  if (!res || res.symbol !== asset.symbol || typeof res.total_supply !== 'string') {
    return ''
  }

  return div(res.total_supply, 1000000)
}

export async function getRichList(
  symbol: string,
  page: number,
  limit: number
): Promise<{ account: string; amount: string }[]> {
  if (!(symbol in ASSETS_BY_SYMBOL)) {
    throw new Error('symbol not found')
  }

  const res = await rp('https://graph.mirror.finance/graphql', {
    method: 'POST',
    rejectUnauthorized: false,
    body: {
      operationName: null,
      query: `query {
        richlist(
          token: "${ASSETS_BY_SYMBOL[symbol].token}",
          offset: ${(page - 1) * limit},
          limit: ${limit}
        ) {
          address
          balance
        }
      }`,
      variables: {}
    },
    json: true
  })

  if (!res?.data?.richlist) {
    return []
  }

  return res.data.richlist.map((e) => ({
    account: e.address,
    amount: div(e.balance, 1000000)
  }))
}
