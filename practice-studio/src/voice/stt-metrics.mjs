function words(text){return (text??"").toLowerCase().trim().split(/\s+/).filter(Boolean);}
export function wordErrorRate(reference,hypothesis){
 const r=words(reference),h=words(hypothesis),dp=Array.from({length:r.length+1},()=>Array(h.length+1).fill(0));
 for(let i=0;i<=r.length;i++)dp[i][0]=i; for(let j=0;j<=h.length;j++)dp[0][j]=j;
 for(let i=1;i<=r.length;i++)for(let j=1;j<=h.length;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(r[i-1]===h[j-1]?0:1));
 return r.length?dp[r.length][h.length]/r.length:(h.length?1:0);
}