import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const fontBoldURL =
    'https://cdn.jsdelivr.net/npm/@fontsource/gabarito/files/gabarito-latin-700-normal.woff';
const fontRegularURL =
    'https://cdn.jsdelivr.net/npm/@fontsource/gabarito/files/gabarito-latin-400-normal.woff';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const username = searchParams.get('username');
        const displayName =
            searchParams.get('displayName') ||
            (username ? `@${username}` : 'iban.bio');

        const [fontBoldData, fontRegularData] = await Promise.all([
            fetch(fontBoldURL).then((res) => res.arrayBuffer()),
            fetch(fontRegularURL).then((res) => res.arrayBuffer()),
        ]);

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#020617', // Slate-950
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.03) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.03) 2%, transparent 0%)`,
                        backgroundSize: '100px 100px',
                        position: 'relative',
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            top: '-10%',
                            right: '-5%',
                            width: '700px',
                            height: '700px',
                            background:
                                'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            bottom: '-10%',
                            left: '-5%',
                            width: '600px',
                            height: '600px',
                            background:
                                'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            width: '100%',
                            height: '100%',
                            padding: '60px',
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                            }}>
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    background:
                                        'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow:
                                        '0 4px 15px rgba(79, 70, 229, 0.4)',
                                }}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ffffff"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                                    <path d="M20 2v4"></path>
                                    <path d="M22 4h-4"></path>
                                    <circle
                                        cx="4"
                                        cy="20"
                                        r="2"></circle>
                                </svg>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: '26px',
                                    fontWeight: 700,
                                    color: 'white',
                                    letterSpacing: '-0.5px',
                                }}>
                                iban.bio
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                paddingTop: '20px',
                            }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxWidth: '55%',
                                }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 16px',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        border: '1px solid rgba(99, 102, 241, 0.3)',
                                        borderRadius: '100px',
                                        marginBottom: '24px',
                                        alignSelf: 'flex-start',
                                    }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '8px',
                                            height: '8px',
                                            background: '#6366f1',
                                            borderRadius: '50%',
                                            marginRight: '10px',
                                        }}></div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            fontSize: '16px',
                                            color: '#a5b4fc',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}>
                                        {username
                                            ? 'Verified Profile'
                                            : 'All-in-One Link'}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '72px',
                                        fontWeight: 700,
                                        color: 'white',
                                        lineHeight: '1.05',
                                        letterSpacing: '-2px',
                                        marginBottom: '20px',
                                        textShadow:
                                            '0 0 40px rgba(255,255,255,0.1)',
                                    }}>
                                    {displayName}
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '30px',
                                        fontWeight: 400,
                                        color: '#94a3b8',
                                        lineHeight: '1.4',
                                    }}>
                                    {username
                                        ? `Pay securely via IBAN, Crypto & Wallets.`
                                        : 'Consolidate your financial identity in one secure link.'}
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '380px',
                                    background: '#615fff03',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '24px',
                                    padding: '24px',
                                    gap: '16px',
                                    boxShadow:
                                        '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                    transform:
                                        'rotate(-6deg) translateY(-20px)',
                                }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#334155',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        padding: '16px',
                                        borderRadius: '16px',
                                        gap: '16px',
                                    }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '10px',
                                            background: '#93e439',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#111"
                                            strokeWidth="2.5">
                                            <path d="M2 12h20M2 12l4-4m-4 4 4 4" />
                                        </svg>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px',
                                        }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                fontSize: '18px',
                                                fontWeight: 700,
                                                color: 'white',
                                            }}>
                                            Wise (USD)
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                fontSize: '14px',
                                                color: '#cbd5e1',
                                                fontFamily: 'monospace',
                                            }}>
                                            US12 **** **** 91
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#0f172a',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        padding: '16px',
                                        borderRadius: '16px',
                                        gap: '16px',
                                        transform: 'scale(1.03)',
                                        boxShadow:
                                            '0 10px 25px -5px rgba(0,0,0,0.3)',
                                    }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '10px',
                                            background: '#10b981',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <path d="M12 8v8" />
                                            <path d="M8 12h8" />
                                        </svg>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px',
                                        }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                fontSize: '18px',
                                                fontWeight: 700,
                                                color: 'white',
                                            }}>
                                            USDT (Tether)
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                fontSize: '14px',
                                                color: '#6ee7b7',
                                            }}>
                                            TRC20 Network
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#334155',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        padding: '16px',
                                        borderRadius: '16px',
                                        gap: '16px',
                                    }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '10px',
                                            background: '#0070ba',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                fontSize: '28px',
                                                fontWeight: 900,
                                                color: 'white',
                                                fontFamily: 'sans-serif',
                                            }}>
                                            P
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px',
                                        }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                fontSize: '18px',
                                                fontWeight: 700,
                                                color: 'white',
                                            }}>
                                            PayPal
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                fontSize: '14px',
                                                color: '#cbd5e1',
                                            }}>
                                            @username
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                paddingTop: '24px',
                                width: '100%',
                            }}>
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: '20px',
                                    color: '#64748b',
                                    fontWeight: 500,
                                }}>
                                iban.bio{username && `/${username}`}
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Gabarito',
                        data: fontBoldData,
                        style: 'normal',
                        weight: 700,
                    },
                    {
                        name: 'Gabarito',
                        data: fontRegularData,
                        style: 'normal',
                        weight: 400,
                    },
                ],
            },
        );
    } catch (e: any) {
        return new Response(`Failed to generate the image`, { status: 500 });
    }
}
