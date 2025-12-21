import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const username = searchParams.get('username');
        const displayName =
            searchParams.get('displayName') ||
            (username ? `@${username}` : 'SecurePay');
        const title = username ? 'Secure Payment Profile' : 'Your Financial ID';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        backgroundColor: '#030712',
                        backgroundImage: `
              radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), 
              radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)
            `,
                        backgroundSize: '100px 100px',
                        position: 'relative',
                    }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '-20%',
                            right: '-10%',
                            width: '800px',
                            height: '800px',
                            background:
                                'radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-20%',
                            left: '-10%',
                            width: '600px',
                            height: '600px',
                            background:
                                'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
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
                                    width: '50px',
                                    height: '50px',
                                    background:
                                        'linear-gradient(135deg, #4f46e5, #9333ea)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow:
                                        '0 4px 20px rgba(79, 70, 229, 0.5)',
                                }}>
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2.5">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <span
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 700,
                                    color: 'white',
                                    letterSpacing: '-0.5px',
                                }}>
                                SecurePay
                            </span>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '40px',
                            }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxWidth: '65%',
                                }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 16px',
                                        background: 'rgba(79, 70, 229, 0.15)',
                                        border: '1px solid rgba(79, 70, 229, 0.3)',
                                        borderRadius: '100px',
                                        marginBottom: '24px',
                                    }}>
                                    <div
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            background: '#4f46e5',
                                            borderRadius: '50%',
                                            marginRight: '10px',
                                        }}></div>
                                    <span
                                        style={{
                                            fontSize: '16px',
                                            color: '#a5b4fc',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}>
                                        {username
                                            ? 'Verified Profile'
                                            : 'Financial Hub'}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        fontSize: '72px',
                                        fontWeight: 700,
                                        color: 'white',
                                        lineHeight: '1.1',
                                        letterSpacing: '-2px',
                                        marginBottom: '16px',
                                    }}>
                                    {displayName}
                                </div>

                                <div
                                    style={{
                                        fontSize: '32px',
                                        fontWeight: 400,
                                        color: '#94a3b8',
                                    }}>
                                    {username
                                        ? `Pay securely via IBAN & Crypto.`
                                        : title}
                                </div>

                                {username && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            marginTop: '30px',
                                            gap: '15px',
                                        }}>
                                        {['IBAN', 'USDT', 'BTC'].map((tag) => (
                                            <div
                                                key={tag}
                                                style={{
                                                    fontSize: '18px',
                                                    padding: '6px 14px',
                                                    borderRadius: '8px',
                                                    background: '#1e293b',
                                                    color: '#cbd5e1',
                                                    border: '1px solid #334155',
                                                }}>
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '320px',
                                    height: '320px',
                                    background:
                                        'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '40px',
                                    boxShadow:
                                        '0 25px 50px -12px rgba(0,0,0,0.5)',
                                    position: 'relative',
                                    transform: 'rotate(-5deg)',
                                }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '30px',
                                        right: '30px',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '40px',
                                        left: '40px',
                                        fontSize: '24px',
                                        color: 'rgba(255,255,255,0.4)',
                                        fontFamily: 'monospace',
                                    }}>
                                    **** 4242
                                </div>

                                <svg
                                    width="100"
                                    height="100"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.8)"
                                    strokeWidth="1.5">
                                    <rect
                                        x="2"
                                        y="5"
                                        width="20"
                                        height="14"
                                        rx="2"
                                    />
                                    <line
                                        x1="2"
                                        y1="10"
                                        x2="22"
                                        y2="10"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'end',
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                paddingTop: '20px',
                            }}>
                            <div style={{ fontSize: '20px', color: '#64748b' }}>
                                securepay.com/{username || ''}
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            background: '#334155',
                                            borderRadius: '2px',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e) {
        return new Response(`Failed to generate the image`, { status: 500 });
    }
}
