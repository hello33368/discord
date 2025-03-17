const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'deploymentvote',
    description: 'Starts a deployment vote requiring a certain number of votes.',
    options: [
        {
            name: 'votes',
            type: 4, // Integer
            description: 'Number of votes required to approve the deployment',
            required: true
        }
    ],
    async execute(interaction) {
        const requiredVotes = interaction.options.getInteger('votes');
        let currentVotes = 0;
        let votedUsers = new Set();

        // 🚨 CHECK IF USER HAS PERMISSION (SPECIFIC ROLE) 🚨
        const requiredRoleId = '1351170771673808969';  // Change this to your required role ID
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.reply({ content: '❌ You do not have permission to start a deployment vote!', ephemeral: true });
        }

        // 🎯 PING A ROLE WHEN THE VOTE STARTS
        const voteRoleId = '1332980229886705685'; // Replace with your voting role ID
        const voteRoleMention = `<@&${voteRoleId}>`;

        // 📌 INITIAL EMBED
        const embed = new EmbedBuilder()
            .setColor(129936)
            .setTitle('**Deployment Vote Started!**')
            .setDescription(`A deployment vote has started! React with ✅ to vote.\n\n**Votes Required:** ${requiredVotes}`);

        const message = await interaction.reply({ content: voteRoleMention, embeds: [embed], fetchReply: true });

        await message.react('✅');

        const filter = (reaction, user) => reaction.emoji.name === '✅' && !user.bot;
        const collector = message.createReactionCollector({ filter });

        collector.on('collect', async (reaction, user) => {
            if (!votedUsers.has(user.id)) {
                votedUsers.add(user.id);
                currentVotes++;

                // ✅ CHECK IF REQUIRED VOTES ARE MET
                if (currentVotes >= requiredVotes) {
                    collector.stop(); // Stop collecting votes

                    // 🎉 FINAL EMBED - DEPLOYMENT APPROVED!
                    const deploymentEmbed = new EmbedBuilder()
                        .setColor(129936)
                        .setTitle('**🚀 DEPLOYMENT STARTED! 🚀**')
                        .setDescription(`Make sure to review <#1333049992411086879> and enjoy!\n\n${voteRoleMention}`);

                    await interaction.channel.send({ content: voteRoleMention, embeds: [deploymentEmbed] });
                }
            }
        });
    }
};
