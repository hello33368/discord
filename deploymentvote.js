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

        // 🚨 CHECK IF USER HAS A SPECIFIC ROLE BEFORE STARTING THE VOTE 🚨
        const requiredRoleId = '1351170771673808969';  // Replace with the actual role ID
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.reply({ content: '❌ You do not have permission to start a deployment vote!', ephemeral: true });
        }

        // 🎯 PING A SPECIFIC ROLE WHEN THE VOTE STARTS
        const voteRoleId = '1332980229886705685'; // Replace with the role ID you want to notify
        const voteRoleMention = `<@&${voteRoleId}>`;

        const embed = new EmbedBuilder()
            .setColor(129936)
            .setTitle('**Deployment Vote Started!**')
            .setDescription(`${voteRoleMention}, a deployment vote has started! React with ✅ to vote.\n\n**Votes Required:** ${requiredVotes}`);

        const message = await interaction.reply({ content: voteRoleMention, embeds: [embed], fetchReply: true });

        await message.react('✅');

        const filter = (reaction, user) => reaction.emoji.name === '✅' && !user.bot;
        const collector = message.createReactionCollector({ filter });

        collector.on('collect', async (reaction, user) => {
            if (!votedUsers.has(user.id)) {
                votedUsers.add(user.id);
                currentVotes++;

                if (currentVotes >= requiredVotes) {
                    const deploymentChannelId = '1333049992411086879'; // Replace with actual channel ID

                    const deploymentEmbed = new EmbedBuilder()
                        .setColor(129936)
                        .setTitle('**DEPLOYMENT STARTED!**')
                        .setDescription(`Make sure to review <#${deploymentChannelId}> and enjoy!`);

                    await interaction.channel.send({ content: voteRoleMention, embeds: [deploymentEmbed] });

                    collector.stop();
                }
            }
        });
    }
};
